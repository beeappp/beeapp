import { StyleSheet, ViewStyle } from 'react-native';

import { Platform } from 'react-native';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  textAlign: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    fontFamily: typography.bold,
    fontSize: 14,
  },
  lineGradientBorder: {
    borderRadius: 30,
  },
});

export const gradientOpacity = ({
  disabled,
}: {
  disabled: any;
}): ViewStyle => ({
  opacity: disabled ? 0.5 : 1,
});
export default styles;
