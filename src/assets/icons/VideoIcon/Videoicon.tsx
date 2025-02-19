import * as React from 'react';
import Svg, { SvgProps, Rect, Circle, Path } from 'react-native-svg';
const VideoIcon = (props: SvgProps) => (
  <Svg width={335} height={220} fill="none" {...props}>
    <Rect width={335} height={220} fill="#fff" rx={20} />
    {/* <Circle cx={168} cy={177} r={30} fill="#434343" /> */}
    <Path fill="#fff" d="m181 177.298-22-12.701V190l22-12.702Z" />
  </Svg>
);
export default VideoIcon;
