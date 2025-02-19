import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const RewindIcon = (props: SvgProps) => (
  <Svg width={30} height={17} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M16 8.475 30 .392v16.166L16 8.475ZM0 8.083 14 0v16.166L0 8.083Z"
    />
  </Svg>
);
export default RewindIcon;
