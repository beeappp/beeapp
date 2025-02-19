import * as React from 'react';
import {
  Text as ReactNativeText,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';
import { presets, TextPresets } from './text.preset';
import { palette } from '../../theme/palette';

export interface TextProps extends TextProperties {
  children?: React.ReactNode;
  text?: string;
  style?: TextStyle | TextStyle[];
  preset?: TextPresets;
  color?: string;
}

const Text: React.FC<TextProps> = props => {
  // grab the props
  const {
    preset = 'text41',
    text,
    children,
    color = palette.black,
    style: styleOverride,
    ...rest
  } = props;

  const content = text || children;

  return (
    <ReactNativeText
      {...rest}
      style={[presets[preset], { color }, styleOverride]}
    >
      {content}
    </ReactNativeText>
  );
};

export default Text;
