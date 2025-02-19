import { StyleSheet } from 'react-native';
import { palette } from '../../theme/palette';

export const styles = StyleSheet.create({
  content: {
    maxWidth: 270,
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 99,
  },
  public: {
    width: 16,
    height: 16,
  },
  textAlign: {
    textAlign: 'center',
  },
  gradient: {
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  img: {
    height: 42,
    width: 42,
  },
  lineGradient: {
    backgroundColor: palette.black,
    borderRadius: 40,
    padding: 2,
  },

  hexagon: {
    width: 100,
    height: 55,
    marginVertical: 10,
  },
  hexagonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -25,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
    borderBottomWidth: 25,
    borderBottomColor: 'gray',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'gray',
  },
  text: {
    color: '#fff',
  },
  lockedText: {
    color: 'red',
  },
  unlockedText: {
    color: 'green',
  },
});
