import { HStack, View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { Platform, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC, useMemo } from 'react';
import CorrcetAnswerIcon from '../../assets/icons/Answers/CorrectAnswerIcon';
import WrongAnswerIcon from '../../assets/icons/Answers/WrongAnswerIcon';
import { useTranslation } from 'react-i18next';

interface Props {
  onPress: () => void;
  correct: boolean;
}
const android = Platform.OS == 'android';

const ExerciseAnswerModal: FC<Props> = ({ onPress, correct }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <HStack style={styles.headerContainer}>
        {correct ? <CorrcetAnswerIcon /> : <WrongAnswerIcon />}
        <Text style={styles.headerText}>
          {correct ? t('correct_answer') : t('wrong_answer')}
        </Text>
      </HStack>
      <VStack style={styles.buttonContainer}>
        <Button
          onPress={onPress}
          colors={palette.lightDark3}
          bgColor={palette.white}
          textStyle={styles.text}
        >
          {t('continue_answer')}
        </Button>
      </VStack>
    </View>
  );
};

export default React.memo(ExerciseAnswerModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: { alignItems: 'center', gap: 15, alignSelf: 'flex-start' },
  buttonContainer: { width: '100%', marginTop: android ? 15 : 30 },
  headerText: {
    fontFamily: typography.regular,
    fontSize: 22,
    color: palette.white,
  },
  text: {
    fontFamily: typography.medium,
    fontSize: 19,
  },
});
