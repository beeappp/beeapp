import {Dimensions} from 'react-native';

const baseSpace = 16;
const bottomSpace = 41;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const spaces = {
  windowWidth,
  windowHeight,
  baseSpace,
  bottomSpace,
  paddingHorizontal: baseSpace,
  marginHorizontal: baseSpace,
};
