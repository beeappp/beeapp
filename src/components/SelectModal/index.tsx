import { View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { Platform, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  buttonTopText: string;
  buttonBottomText: string;
  onPressTop: () => void;
  onPressBottom: () => void;
}

const android = Platform.OS == 'android';

const SelectModal: FC<Props> = ({
  onPressTop,
  onPressBottom,
  buttonTopText,
  buttonBottomText,
  title,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <VStack style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Text
          style={[
            styles.text,
            {
              fontFamily: typography.light,
            },
          ]}
        >
          {subtitle}
        </Text>
      </VStack>
      <VStack style={styles.buttonContainer}>
        <Button
          onPress={onPressTop}
          colors={palette.lightDark2}
          bgColor={palette.white}
          textStyle={styles.text}
        >
          {buttonTopText}
        </Button>
        <Button onPress={onPressBottom} textStyle={styles.text}>
          {buttonBottomText}
        </Button>
      </VStack>
    </View>
  );
};

export default React.memo(SelectModal);

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
    gap: 5,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
    marginTop: android ? 10 : 20,
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
