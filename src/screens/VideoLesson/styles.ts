import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { palette } from '../../theme/palette';

export const styles = StyleSheet.create({
  absoluteContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
  absoluteHeader: {
    position: 'absolute',
    zIndex: 99,
    top: 10,
  },
  pauseIcon: {
    position: 'absolute',
    top: '45%',
    bottom: '50%',
    alignSelf: 'center',
  },
  slider: {
    position: 'absolute',
    width: '85%',
    // top: '0%',
    bottom: 10,
    alignSelf: 'center',
  },
  textContainer: {
    borderRadius: 20,
    backgroundColor: palette.grey,
    padding: 13,
  },
  textSpeak: {
    fontFamily: typography.light,
    fontSize: 18,
    color: palette.white,
  },
  videoControlContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  icon: {
    position: 'absolute',
    zIndex: 99,
    bottom: 80, //change based on size of screen height
    alignSelf: 'center',
    alignItems: 'center',
  },
});
