import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Layout } from '../../navigator/Layout';
import { Box, VStack } from '@gluestack-ui/themed';
import TabHeader from '../../components/TabHeader';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import {
  AppStackScreenProps,
  MainStackParamList,
} from '../../navigator/appNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMainQuran } from '../../store/mainQuran';
import QuranTextItem from '../../components/QuranTextItem/QuranTextItem';
import { Verse, VersesByJuz } from '../../store/mainQuran/types';
import { FlashList } from '@shopify/flash-list';
import { load, remove, save } from '../../utils/storage';
import { useAtom } from 'jotai';
import { pageNumber, quranText } from '../../tools/atoms/common';

const KuranTextScreen: FC<
  NativeStackScreenProps<MainStackParamList, 'KuranText'>
> = ({ route }) => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const surah_Id = route.params?.surah_Id;
  const juz_Id = route.params?.juz_Id;
  const surah_name = route.params?.name;
  const ayait_count = route.params.ayiatNumber;
  const {
    getVersesById,
    getVersesByJuzs,
    isLoading,
    totalPages,
    setTotalPages,
  } = useMainQuran();

  const [currentPage, setCurrentPage] = useAtom(pageNumber);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useAtom(quranText);
  const [cacheLoaded, setCacheLoaded] = useState(false);
  const [allPages, setAllPages] = useState(1);

  const cacheKey = juz_Id ? `Text_${surah_Id}_${juz_Id}` : `Text_${surah_Id}_0`;

  const exitQuranText = useCallback(() => {
    setCurrentPage(0);
    setItems([]);
    navigation.goBack();
  }, []);

  const fetchData = async (page: number) => {
    try {
      if (!cacheLoaded) {
        const cachedData = await load(cacheKey);
        if (cachedData?.items?.length) {
          setItems(cachedData.items);
          setCurrentPage(cachedData.currentPage || 1);
          setCacheLoaded(true);
          return;
        }
      }

      let res: any;
      if (surah_Id && juz_Id) {
        res = await getVersesByJuzs({
          page: page,
          juz: juz_Id,
          surah: surah_Id,
          words: 'true',
          translations: 'true',
        });
      }
      if (surah_Id && !juz_Id) {
        res = await getVersesById({
          page: page,
          id: surah_Id,
          words: 'true',
          translations: 'true',
        });
      }
      const newCacheData = {
        items: [...items, ...res.data],
        currentPage: page,
      };
      setItems(prev => [...prev, ...res.data]);
      save(cacheKey, newCacheData);
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleLoadMore = useCallback(() => {
    if (ayait_count > items.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [items]);

  return (
    <Layout top padding>
      <TabHeader
        variant={'withSettingsIcon'}
        headerScreenTitle={surah_name}
        textStyle={styles.headerText}
        onPress={exitQuranText}
        onPressSetting={() => {
          navigation.navigate('KuranSettings');
        }}
        gradient={palette.arrowGradient2}
      />

      <Box flex={1}>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={items}
          renderItem={({ item }: { item: any }) => (
            <QuranTextItem item={item} />
          )}
          keyExtractor={(item: any, i: number) => `${i}-${item.verse_key}`}
          estimatedItemSize={400}
          onEndReachedThreshold={1}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            <VStack h={75}>
              {isLoading && (
                <ActivityIndicator size="small" style={{ marginBottom: 45 }} />
              )}
            </VStack>
          }
        />
      </Box>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: typography.medium,
    textAlign: 'center',
    color: palette.black,
    lineHeight: 25,
  },
});

export default KuranTextScreen;
