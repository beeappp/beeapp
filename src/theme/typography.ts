import { Platform } from 'react-native';

const device = Platform.OS == 'ios' ? 'SFProDisplay-' : 'SF-Pro-Display-';
const arabic = Platform.OS == 'ios' ? 'ScheherazadeNew-' : 'ScheherazadeNew-';

export const typography = {
  // black: device + 'Black',
  // blackItalic: device + 'BlackItalic',
  bold: device + 'Bold',
  // boldItalic: device + 'BoldItalic',
  // heavy: device + 'Heavy',
  // heavyItalic: device + 'HeavyItalic',
  light: device + 'Light',
  // lightItalic: device + 'LightItalic',
  medium: device + 'Medium',
  // mediumItalic: device + 'MediumItalic',
  regular: device + 'Regular',
  // regularItalic: device + 'RegularItalic',
  semiBold: device + 'SemiBold',
  // semiBoldItalic: device + 'SemiBoldItalic',
  // thin: device + 'Thin',
  // thinItalic: device + 'ThinItalic',
  // ultraLight: device + 'UltraLight',
  // ultraLightItalic: device + 'UltraLightItalic',
  arabBold: arabic + 'Bold',
  arabSemiBold: arabic + 'SemiBold',
  arabRegular: arabic + 'Regular',
  araMedium: arabic + 'Medium',
};
