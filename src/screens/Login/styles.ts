import { StyleSheet } from 'react-native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  textHeader: { textAlign: 'left', width: '100%' },
  textField: {
    // borderColor: palette.white,
    // borderRadius: 5,
  },
  buttonText: {
    fontFamily: typography.semiBold,
    fontSize: 17,
    color: palette.white,
  },
});
