import { StyleSheet } from 'react-native';

// styles
import { palette } from '../../theme/palette';

export const styles = StyleSheet.create({
  videoView: {
    marginBottom: 5,
    borderWidth: 1,

    borderColor: palette.white,
    borderRadius: 20,
  },
  player: {
    borderColor: palette.white,
  },
  textView: {
    paddingHorizontal: 10,
  },

  docs: {
    marginTop: 7,
  },

  backgroundVideo: {
    width: '100%',
    height: 220,
  },
});

export default styles;
