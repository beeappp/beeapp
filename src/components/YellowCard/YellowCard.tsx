import { ImageBackground, Pressable, View, VStack } from '@gluestack-ui/themed';
import React, { FC } from 'react';
import Text from '../Text/Text';
import { styles } from './styles';
import HexSecondarIcon from '../../assets/icons/HexGridCard/HexSecondary';
import OuterLayerBigIcon from '../../assets/icons/HexGridCard/OuterLayerBigIcon';
import HexMainIcon from '../../assets/icons/HexGridCard/HexMain';
import OuterLayerSmallIcon from '../../assets/icons/HexGridCard/OuterLayerSmallIcon';
import { useAtomValue } from 'jotai';
import { ChoosenClassAtom } from '../../tools/atoms/common';
import { useTranslation } from 'react-i18next';

interface YellowCardProps {
  onPress: () => void;
}

const YellowCard: FC<YellowCardProps> = ({ onPress }) => {
  const choosenClass = useAtomValue(ChoosenClassAtom);
  const { t } = useTranslation();
  console.log('choosenClass',choosenClass)

  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        style={styles.imageBg}
        imageStyle={styles.img}
        source={require('../../assets/img/HomeCards/YellowCard.png')}
        resizeMode="stretch"
      >
        <View style={styles.card}>
          <Text style={styles.cardTextHeader}>{t('tadzhuid')}</Text>
          <VStack>
            <Text style={styles.cardTextDate}>{`${choosenClass}`}/22</Text>
            <Text style={styles.cardTextStop}>{t('last_lesson')}</Text>
          </VStack>
        </View>
        <View position="absolute" w={'50%'} height={'100%'} right={0}>
          <View
            position="absolute"
            right={20}
            bottom={70}
            justifyContent="center"
            alignItems="center"
          >
            <HexSecondarIcon roundNumber={`${choosenClass + 1}`} />
          </View>
          <View
            position="absolute"
            right={20}
            bottom={-5}
            justifyContent="center"
            alignItems="center"
          >
            <HexSecondarIcon roundNumber={`${choosenClass + 2}`} />
          </View>
          <View
            position="absolute"
            left={17}
            top={20}
            justifyContent="center"
            alignItems="center"
          >
            <View position="absolute">
              <OuterLayerBigIcon />
            </View>
            <View position="absolute">
              <OuterLayerSmallIcon />
            </View>

            <HexMainIcon roundNumber={`${choosenClass}`} />
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default YellowCard;
