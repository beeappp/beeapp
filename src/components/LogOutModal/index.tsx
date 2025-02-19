import { View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { Platform, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onPressTop: () => void;
  onPressBottom: () => void;
}

const android = Platform.OS == 'android';

const LogOutModal: FC<Props> = ({ onPressTop, onPressBottom }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <VStack style={styles.headerContainer}>
        <Text style={styles.headerText}>{t('log_out')}</Text>
      </VStack>
      <VStack style={styles.buttonContainer}>
        <Button
          onPress={onPressTop}
          colors={palette.lightDark2}
          bgColor={palette.white}
          textStyle={styles.text}
        >
          {t('yes_out')}
        </Button>
        <Button onPress={onPressBottom} textStyle={styles.text}>
          {t('no_stay')}
        </Button>
      </VStack>
    </View>
  );
};

export default React.memo(LogOutModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: android ? 0 : 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 7,
    marginTop: android ? 10 : 30,
  },
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
