import { Center, Pressable, Spinner, Text } from '@gluestack-ui/themed';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

// styles
import { gradientOpacity, styles } from './styles';
import { palette } from '../../theme/palette';

interface ButtonProps {
  colors?: any;
  children: React.ReactNode;
  width?: number;
  variant?: string;
  onPress: () => void;
  textStyle?: TextStyle | TextStyle[];
  buttonStyle?: ViewStyle | ViewStyle[];
  isLoading?: boolean;
  disabled?: boolean;
  // lineGradientButtonStyle?: ViewStyle | ViewStyle[];
  icon?: any;
  bgColor?: string;
  borderColor?: string;
  activeBgColor?: string;
  activeBorderColor?: string;
  borderRadius?: number;
}
const Button = ({
  colors,
  children,
  textStyle,
  variant,
  onPress,
  disabled,
  isLoading,
  buttonStyle,
  bgColor,
  borderColor,
  activeBgColor,
  activeBorderColor,
  borderRadius,
}: // lineGradientButtonStyle,
ButtonProps) => {
  switch (variant) {
    default:
      return (
        <Pressable
          disabled={disabled}
          onPress={onPress}
          bgColor={bgColor ? bgColor : palette.brownGrey}
          borderColor={borderColor ? borderColor : palette.brownGrey}
          $active-bgColor={activeBgColor ? activeBgColor : palette.activeButton}
          $active-borderColor={
            activeBorderColor ? activeBorderColor : palette.activeButton
          }
          // $disabled-bgColor={palette.disabledButton}
          borderRadius={borderRadius ? borderRadius : 40}
          borderWidth={1.5}
          w={'100%'}
          h={60}
          style={[
            gradientOpacity({ disabled: disabled }),
            { justifyContent: 'center' },
            buttonStyle,
          ]}
        >
          {() => (
            <Center>
              {!isLoading ? (
                <Text
                  style={[styles.textAlign, textStyle]}
                  color={colors ? colors : palette.white}
                >
                  {children}
                </Text>
              ) : (
                <Spinner
                  paddingVertical={11}
                  color={colors ? colors : palette.white}
                />
              )}
            </Center>
          )}
        </Pressable>
      );
  }
};
export default Button;
