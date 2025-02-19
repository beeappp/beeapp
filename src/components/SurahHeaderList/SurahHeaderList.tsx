import { HStack, View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { palette } from '../../theme/palette';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Surah } from '../../store/mainQuran/types';
import ListGridIcon from '../../assets/icons/ReadKuran/ListGridIcon';

interface Props {
  items: Surah[] | [];
  onPress: (surah: Surah) => void;
}

const SurahHeaderList: FC<Props> = ({ items, onPress }) => {
  const { t } = useTranslation();

  return items.length > 0 ? (
    <VStack>
      <Text style={styles.listHeaderText}>{t('last_surah')}</Text>
      <VStack paddingVertical={20}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPress(item)}
            style={styles.itemContainer}
          >
            <HStack style={styles.lastReadContainer}>
              <ListGridIcon roundNumber={`${item.id}`} />
            </HStack>
            <View style={styles.numberContainer}></View>
            <View style={styles.contentContainer}>
              <Text style={styles.nameText}>{item.name_simple}</Text>
              <HStack gap={5}>
                <Text style={styles.versesCountText}>
                  {item.verses_count} {t('ayiat')},
                </Text>
                <Text style={styles.versesCountText}>
                  {item.page_from} {t('page')}
                </Text>
              </HStack>
            </View>
          </TouchableOpacity>
        ))}
      </VStack>
    </VStack>
  ) : (
    <></>
  );
};

export default React.memo(SurahHeaderList);

const styles = StyleSheet.create({
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
  versesCountText: {
    fontSize: 11,
    color: palette.brownGrey,
  },
  lastReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 13,
    fontFamily: typography.medium,
    color: '#6E6E73',
  },
});
