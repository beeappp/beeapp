import { View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC, useCallback, useState } from 'react';
import ExerciseMicroIcon from '../../assets/icons/Microphone/ExerciseMicroIcon';
import ActiveExerciseMicroIcon from '../../assets/icons/Microphone/ActiveExerciseMicroIcon';
import { useTranslation } from 'react-i18next';

interface Props {
  item?: any;
  index?: number;
  openCorrect: () => void;
  openWrong: () => void;
}

const RecordExercise: FC<Props> = ({ item, index, openCorrect, openWrong }) => {
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const { t } = useTranslation();

  const SubmitPress = useCallback(async () => {
    if (true) openCorrect();
    else openWrong();
  }, []);

  const handleSoundPress = useCallback(() => {
    setActiveSound(true);

    const timer = setTimeout(() => {
      setActiveSound(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Text
        style={{
          marginTop: 30,
          fontFamily: typography.light,
          fontSize: 35,
          lineHeight: 40,
          textAlign: 'center',
          color: palette.greyScale11,
        }}
      >
        {t('speak_exercise')}
      </Text>

      <VStack gap={40} alignItems="center">
        <Text
          style={{
            fontFamily: typography.regular,
            fontSize: 50,
            textAlign: 'center',
          }}
        >
          بَاتْ
        </Text>
        <View
          borderRadius={20}
          bgColor={palette.greyScale6}
          paddingHorizontal={37}
          paddingVertical={12}
        >
          <Text
            color={palette.white}
            style={{
              fontFamily: typography.light,
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {'[айтылған сөз]'}
          </Text>
        </View>
        <VStack gap={10}>
          <TouchableOpacity onPress={handleSoundPress}>
            {activeSound ? <ActiveExerciseMicroIcon /> : <ExerciseMicroIcon />}
          </TouchableOpacity>
          <Text
            color={palette.black}
            style={{
              fontFamily: typography.light,
              fontSize: 18,
              textAlign: 'center',
              opacity: 0.2,
            }}
          >
            Press to talk
          </Text>
        </VStack>
      </VStack>

      <Button
        colors={palette.lightDark3}
        bgColor={palette.white}
        borderColor={palette.white}
        textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
        onPress={SubmitPress}
      >
        {t('confirm')}
      </Button>
    </VStack>
  );
};

export default React.memo(RecordExercise);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 15,
  },
  headerText: {
    marginTop: 30,
    fontFamily: typography.light,
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: palette.greyScale11,
  },
  itemContainer: {
    width: 130,
    height: 60,
    backgroundColor: palette.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  itemText: {
    fontSize: 25,
    color: palette.lightDark2,
    textAlign: 'center',
    fontFamily: typography.regular,
  },
  answer: {
    backgroundColor: palette.lightDark2,
  },
  selectedText: {
    color: '#fff',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderColor: '#000',
  },
  selected: {
    backgroundColor: palette.lightDark2,
  },
  selectedText4: { color: palette.white },
  text: {
    fontSize: 24,
    color: '#000',
  },
});
