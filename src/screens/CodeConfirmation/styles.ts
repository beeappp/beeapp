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
  headerText: {
    fontFamily: typography.semiBold,
    fontSize: 28,
    lineHeight: 30,
    color: palette.textcolor1,
    alignSelf: 'flex-start',
    marginLeft: 21,
  },
  resendText: {
    fontFamily: typography.semiBold,
    fontSize: 16,
    lineHeight: 30,
    color: palette.codeResend,
    textDecorationLine: 'underline',
  },
});
