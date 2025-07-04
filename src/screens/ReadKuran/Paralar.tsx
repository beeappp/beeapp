import { Box, SectionList, Text, View, VStack } from '@gluestack-ui/themed';
import React, { useMemo } from 'react';
import { Layout } from '../../navigator/Layout';
import { palette } from '../../theme/palette';
import { Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppStackScreenProps } from '../../navigator/appNavigator';
import { typography } from '../../theme/typography';
import { useMainQuran } from '../../store/mainQuran';
import { JuzsItem, SurahOfJuz } from '../../store/mainQuran/types';
import JuzsSectionItem from '../../components/QuranItems/JuzsSectionItem';

const platform = Platform.OS == 'android';

const ParalarScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { juzs } = useMainQuran();
  console.log('juzs', juzs);

  const surahCount = useMemo(() => {
    return juzs.reduce((acc, { surahs }, index) => {
      const start = index === 0 ? 1 : acc[index - 1][1] + 1;
      const end = start + surahs.length - 1;
      acc.push([start, end]);
      return acc;
    }, [] as number[][]);
  }, [juzs]);

  const readParaText = (surah: SurahOfJuz, juz_Id: number) => {
    navigation.navigate('KuranText', {
      juz_Id: juz_Id,
      surah_Id: surah.surah_id,
      name: surah.name_simple,
      ayiatNumber: surah.last_verse_id - surah.first_verse_id + 1,
    });
  };

  const JuzsListItem: React.FC<{ item: JuzsItem; index: number }> = ({
    item,
    index,
  }) => {
    return (
      <VStack mb={15}>
        <View marginVertical={10}>
          <Text style={styles.paraCountText}>{`${item.id} пара`}</Text>
        </View>
        {item.surahs.map((surah, surahIndex) => (
          <JuzsSectionItem
            key={`${index}:${surahIndex}`}
            item={surah}
            index={index}
            juz_Id={item.id}
            surahIndex={surahIndex}
            surahCount={surahCount}
            onPress={readParaText}
          />
        ))}
      </VStack>
    );
  };

  const data = useMemo(() => {
    return juzs.map(item => {
      const data = item.surahs.map(e => {
        return { ...e, juzId: item.id };
      });
      return {
        data,
        title: item.surahs.length ? `${item.id} пара` : null,
      };
    });
  }, [juzs]);

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
            // marginTop={20}
            paddingBottom={platform ? 60 : 0}
          >
            <SectionList
              w={'100%'}
              mb={15}
              sections={data}
              keyExtractor={(item, index) => item.surah_id + index}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item, index }) => (
                <JuzsSectionItem
                  key={`${item.surah_id}-${new Date().getTime()}`}
                  item={item}
                  index={index}
                  juz_Id={item.juzId}
                  surahIndex={index}
                  surahCount={surahCount}
                  onPress={readParaText}
                />
              )}
              renderSectionHeader={({ section: { title } }) =>
                title ? (
                  <View marginVertical={10}>
                    <Text style={styles.paraCountText}>{title}</Text>
                  </View>
                ) : null
              }
            />
          </Box>
        </Layout>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingVertical: 20, paddingBottom: 50 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  paraCountText: {
    fontSize: 13,
    fontFamily: typography.bold,
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
export default ParalarScreen;
