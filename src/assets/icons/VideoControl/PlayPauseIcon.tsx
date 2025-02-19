import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PlayPauseIcon = (props: SvgProps) => (
  <Svg width={32} height={37} fill="none" {...props}>
    <Path fill="#fff" d="M32 18.525 0 .05V37l32-18.475Z" />
  </Svg>
);
export default PlayPauseIcon;
