import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const FastForwardIcon = (props: SvgProps) => (
  <Svg width={30} height={17} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M14 8.475 0 .392v16.166l14-8.083ZM30 8.083 16 0v16.166l14-8.083Z"
    />
  </Svg>
);
export default FastForwardIcon;
