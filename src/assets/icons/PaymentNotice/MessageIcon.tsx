import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
const MessageIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path fill="#1E1E1E" d="M0 0h30v30H0z" />
    <Rect width={375} height={812} x={-24} y={-459} fill="#fff" rx={30} />
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.39}
      d="M9.667 13 15 16.333 20.333 13M9 12.667l6-3.334 6 3.334"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.39}
      d="M21 12.667v6.666a1.334 1.334 0 0 1-1.333 1.334h-9.334A1.334 1.334 0 0 1 9 19.333v-6.666"
    />
  </Svg>
);
export default MessageIcon;
