import {
  CheckboxIcon,
  CheckboxLabel,
  HStack,
  ImageBackground,
  Pressable,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { Checkbox, CheckboxIndicator } from '@gluestack-ui/themed';
import React, { FC, useState } from 'react';

import { CheckIcon } from '@gluestack-ui/themed';
import { palette } from '../../theme/palette';
import Text from '../Text/Text';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

interface BlueCardProps {
  onPress: () => void;
}

const BlueCard: FC<BlueCardProps> = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        style={styles.imageBg}
        imageStyle={styles.img}
        source={require('../../assets/img/HomeCards/BlueCard.png')}
        resizeMode="stretch"
      >
        <View flex={1} style={styles.card}>
          <Text style={styles.cardTextHeader}>{t('quran_read')}</Text>
          <VStack>
            <HStack alignItems="flex-end">
              <Text style={styles.cardTextDate}>6</Text>
              <Text style={styles.cardText2}>-{t('sura')}, </Text>
              <Text style={styles.cardTextDate}>3</Text>
              <Text style={styles.cardText2}>-{t('ayiat')}</Text>
            </HStack>

            <Text style={styles.cardTextStop}>{t('last_read')}</Text>
          </VStack>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default BlueCard;
