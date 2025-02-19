import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { palette } from '../../theme/palette';

export const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    alignContent: 'center',
  },
  textHeader: { textAlign: 'left', width: '100%' },
  buttonText: {
    fontFamily: typography.semiBold,
    fontSize: 17,
    color: '#353535',
  },
  buttonText2: {
    fontFamily: typography.semiBold,
    fontSize: 17,
    color: palette.white,
  },
});
