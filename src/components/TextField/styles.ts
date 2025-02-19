import { StyleSheet, ViewStyle } from 'react-native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';

// styles

const styles = StyleSheet.create({
  maskInput: {
    flex: 1,
    paddingLeft: 24,
    color: palette.textcolor1,
    fontSize: 18,
    fontFamily: typography.regular,
  },

  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    color: palette.blue,
    fontFamily: typography.regular,
  },
  errorIcon: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  errorText: {
    marginLeft: 9.33,
    fontSize: 12,
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  showPasswordButton: {
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  valid: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  limitText: {
    textAlign: 'right',
  },
});
export const inputWrapper = ({}: {}): ViewStyle => ({
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
});
export default styles;
