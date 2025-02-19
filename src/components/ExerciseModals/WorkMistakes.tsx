import { View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onPressTop: () => void;
  onPressBottom: () => void;
  finished: boolean;
}

const WorkMistakesModal: FC<Props> = ({
  onPressTop,
  onPressBottom,
  finished,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <VStack w={'100%'} style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {finished ? t('round_end') : t('correct_mistake')}
        </Text>
      </VStack>
      <VStack style={styles.buttonContainer}>
        <Button
          onPress={onPressTop}
          textStyle={styles.text}
          colors={palette.lightDark2}
          bgColor={palette.white}
        >
          {t('exit_mistake')}
        </Button>
        <Button onPress={onPressBottom} textStyle={styles.text}>
          {finished ? t('next_round') : t('work_mistake')}
        </Button>
      </VStack>
    </View>
  );
};

export default React.memo(WorkMistakesModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: { justifyContent: 'flex-start', marginTop: 10 },
  buttonContainer: { width: '100%', gap: 7, marginTop: 30 },
  headerText: {
    fontFamily: typography.medium,
    fontSize: 24,
    color: palette.lightDark,
  },
  text: {
    fontFamily: typography.medium,
    fontSize: 19,
  },
});
