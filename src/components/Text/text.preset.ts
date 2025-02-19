import { TextStyle } from 'react-native';
import { typography } from '../../theme/typography';

export const presets: Record<string, TextStyle> = {
  heading1: {
    fontSize: 48,
    lineHeight: 54,
    fontFamily: typography.bold,
  },
  heading2: {
    fontSize: 40,
    fontFamily: typography.semiBold,
    lineHeight: 44,
  },
  heading3: {
    fontSize: 32,
    lineHeight: 34,
    fontFamily: typography.semiBold,
  },
  heading4: {
    fontSize: 28,
    lineHeight: 30,
    fontFamily: typography.semiBold,
  },
  heading5: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: typography.semiBold,
  },
  heading6: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: typography.semiBold,
  },

  lRegular1: {
    fontFamily: typography.regular,
    fontSize: 18,
    lineHeight: 20,
  },
  lRegular2: {
    fontFamily: typography.regular,
    fontSize: 16,
    lineHeight: 18,
  },
  lMedium: {
    fontFamily: typography.medium,
    fontSize: 18,
    lineHeight: 20,
  },
  mRegular: {
    fontFamily: typography.regular,
    fontSize: 14,
    lineHeight: 16,
  },
  sRegular: {
    fontFamily: typography.regular,
    fontSize: 12,
    lineHeight: 14,
  },
  sSemiBold: {
    fontFamily: typography.semiBold,
    fontSize: 12,
    lineHeight: 14,
  },
  xsRegular: {
    fontFamily: typography.regular,
    fontSize: 10,
    lineHeight: 12,
  },
};

export type TextPresets = keyof typeof presets;
