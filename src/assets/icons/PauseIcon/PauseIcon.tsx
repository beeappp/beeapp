import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const PauseIcon = (props: SvgProps) => (
  <Svg width={60} height={60} fill="none" {...props}>
    <Circle cx={30} cy={30} r={30} fill="#434343" />
    <Path fill="#fff" d="M43 30.298 21 17.597V43l22-12.702Z" />
  </Svg>
);
export default PauseIcon;
