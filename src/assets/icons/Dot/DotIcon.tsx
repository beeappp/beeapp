import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';
const DotIcon = (props: SvgProps) => (
  <Svg width={8} height={8} fill="none" {...props}>
    <Circle cx={4} cy={4} r={4} fill="#6F6F6F" />
  </Svg>
);
export default DotIcon;
