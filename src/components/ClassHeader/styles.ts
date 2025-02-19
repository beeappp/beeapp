import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { palette } from '../../theme/palette';

export const styles = StyleSheet.create({
  tabHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 17,
    backgroundColor: palette.white,
  },
  levelNText: {
    fontFamily: typography.regular,
    fontSize: 14.5,
    lineHeight: 17,
  },
  levelName: { fontFamily: typography.regular, fontSize: 20, lineHeight: 24 },
  lessonName: { fontFamily: typography.light, fontSize: 22, lineHeight: 25 },
  classIcon: {},
  withBackIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  withSettingsIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  hitSlop: {
    left: 5,
    right: 5,
    bottom: 5,
    top: 5,
  },
});
