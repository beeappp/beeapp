import { Box, FlatList, View } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';

//style
import { Layout } from '../../navigator/Layout';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import { Platform, StyleSheet } from 'react-native';

//navigation
import { useNavigation } from '@react-navigation/native';
import { AppStackScreenProps } from '../../navigator/appNavigator';

import { useMainQuran } from '../../store/mainQuran';
import { Surah } from '../../store/mainQuran/types';
import QuranItems from '../../components/QuranItems/SurahListItem';
import SurahHeaderList from '../../components/SurahHeaderList/SurahHeaderList';
import {
  LastReadSurahAtom,
  readAtomData,
  setAtomData,
} from '../../tools/atoms/common';
import SurahListItem from '../../components/QuranItems/SurahListItem';

const platform = Platform.OS == 'android';

const SuralarScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { surahs, getVersesById } = useMainQuran();
  const [recentSurahs, setRecentSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    const loadRecentSurahs = async () => {
      try {
        const storedSurahs: any = await readAtomData(LastReadSurahAtom);
        if (storedSurahs) {
          setRecentSurahs(storedSurahs);
        }
      } catch (error) {
        console.error('Failed to load recent Surahs:', error);
      }
    };
    loadRecentSurahs();
  }, []);

  const readSurahText = async (surah: Surah) => {
    navigation.navigate('KuranText', {
      surah_Id: surah.id,
      name: surah.name_simple,
      ayiatNumber: surah.verses_count,
    });
    const updatedRecentSurahs = [
      surah,
      ...recentSurahs.filter(item => item.id !== surah.id),
    ].slice(0, 3);

    setRecentSurahs(updatedRecentSurahs);
    try {
      await setAtomData(LastReadSurahAtom, updatedRecentSurahs);
    } catch (error) {
      console.error('Failed to save recent Surahs:', error);
    }
  };

  const ListHeaderItem = (
    <SurahHeaderList items={recentSurahs} onPress={readSurahText} />
  );

  return (
    <View flex={1} bgColor={palette.lightDark2}>
      <View
        flex={1}
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
        bgColor={palette.background}
      >
        <Layout bottom padding>
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            paddingBottom={platform ? 70 : 30}
          >
            <FlatList
              w={'100%'}
              data={surahs}
              ListHeaderComponent={ListHeaderItem}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }: { item: any; index: number }) => (
                <SurahListItem
                  item={item}
                  index={index}
                  onPress={readSurahText}
                />
              )}
              keyExtractor={(_, i) => i.toString()}
              contentContainerStyle={styles.listContainer}
            />
          </Box>
        </Layout>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingVertical: 20 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 5,
    paddingVertical: 5,
  },
  nameText: {
    fontSize: 15,
    fontFamily: typography.regular,
    color: palette.black,
  },
  arabicNameText: {
    fontSize: 14,
    color: '#666',
  },
  versesCountText: {
    fontSize: 11,
    color: palette.brownGrey,
  },
  listHeaderText: {
    fontSize: 13,
    fontFamily: typography.medium,
    color: '#6E6E73',
  },
  lastReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastReadText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#007AFF',
  },
});
export default SuralarScreen;
