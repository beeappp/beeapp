import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PauseIcon = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M8 5v14m8-14v14"
    />
  </Svg>
);
export default PauseIcon;
