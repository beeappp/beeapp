import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const BlankSmallIcon = (props: SvgProps) => (
  <Svg width={40} height={46} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.7}
      d="M22.274 44.73c-1.439.83-3.21.83-4.649 0l-15.3-8.835A4.648 4.648 0 0 1 0 31.87V14.2c0-1.66.886-3.195 2.324-4.025l15.301-8.834a4.648 4.648 0 0 1 4.649 0l15.3 8.834A4.648 4.648 0 0 1 39.9 14.2V31.87c0 1.66-.886 3.195-2.324 4.025L22.274 44.73Z"
      opacity={0.77}
    />
  </Svg>
);
export default BlankSmallIcon;
