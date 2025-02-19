import { StyleSheet } from 'react-native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  imageBg: {
    height: 200,
  },
  img: {
    width: '100%',
    height: 200,
  },
  card: {
    width: '50%',
    height: '100%',
    padding: 16,
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  cardTextHeader: {
    fontFamily: typography.medium,
    fontSize: 18,
    lineHeight: 18,
    color: palette.white,
  },
  cardTextDate: {
    fontFamily: typography.light,
    fontSize: 56,
    lineHeight: 58,
    color: palette.white,
  },
  cardText2: {
    fontFamily: typography.light,
    fontSize: 30,
    lineHeight: 48,
    color: palette.white,
  },
  cardTextStop: {
    fontFamily: typography.light,
    fontSize: 14,
    lineHeight: 16,
    color: palette.white,
  },
});
