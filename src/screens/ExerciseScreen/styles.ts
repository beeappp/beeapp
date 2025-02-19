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
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 15,
  },
  itemContainer: {
    width: 130,
    height: 60,
    backgroundColor: palette.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  itemText: {
    fontSize: 30,
    color: palette.lightDark2,
    textAlign: 'center',
    fontFamily: typography.arabBold,
  },
  answer: {
    backgroundColor: palette.lightDark2,
  },
  selectedText: {
    color: '#fff',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderColor: '#000',
  },
  selected: {
    backgroundColor: palette.lightDark2,
  },
  selectedText4: { color: palette.white },
  text: {
    fontSize: 24,
    color: '#000',
  },
  wrongText: {
    fontSize: 18,
    color: palette.lightDark,
    fontFamily: typography.regular,
  },
  wrongGoBackContainer: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 50,
    alignSelf: 'flex-start',
  },
});
