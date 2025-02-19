import { HStack, View } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { palette } from '../../theme/palette';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Surah } from '../../store/mainQuran/types';
import ListGridIcon from '../../assets/icons/ReadKuran/ListGridIcon';

interface Props {
  item: Surah;
  index: number;
  onPress: (surah: Surah) => void;
}

const SurahListItem: FC<Props> = ({ item, index, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(item)}
      style={styles.itemContainer}
    >
      <HStack style={styles.lastReadContainer}>
        <ListGridIcon roundNumber={`${index + 1}`} />
      </HStack>
      <View style={styles.numberContainer}></View>
      <View style={styles.contentContainer}>
        <Text style={styles.nameText}>{item.name_simple}</Text>
        <HStack gap={5}>
          <Text style={styles.versesCountText}>
            {item.verses_count} {t('ayiat')},
          </Text>
          <Text style={styles.versesCountText}>
            {item.page_to === item.page_from
              ? item.page_to
              : item.page_to - item.page_from}{' '}
            {t('page')}
          </Text>
        </HStack>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SurahListItem);

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
});
