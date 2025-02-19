import { StyleSheet } from 'react-native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.topBar,
    borderRadius: 9,
    padding: 1,
  },
  labelItem: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 7,
  },
  tabBarLabel: {
    fontSize: 13,
    fontFamily: typography.semiBold,
    lineHeight: 18,
    textAlign: 'center',
    color: palette.white,
  },
});

export default styles;
