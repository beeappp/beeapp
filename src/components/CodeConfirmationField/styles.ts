import { StyleSheet } from 'react-native';
import { palette } from '../../theme/palette';

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    paddingHorizontal: 30,
    gap: 5,
  },
  cell: {
    width: 50,
    height: 70,
    lineHeight: 70,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 16,
    textAlign: 'center',
    color: palette.lightDark2,
  },
});

export default styles;
