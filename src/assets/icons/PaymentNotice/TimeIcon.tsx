import * as React from 'react';
import Svg, { SvgProps, Path, Rect, G, Defs, ClipPath } from 'react-native-svg';
const TimeIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path fill="#1E1E1E" d="M0 0h30v30H0z" />
    <Rect width={375} height={812} x={-24} y={-398} fill="#fff" rx={30} />
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.39}
      clipPath="url(#a)"
    >
      <Path d="M14.933 10.933v4L15 15l1.4 1.4" />
      <Path d="M15 21.667a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M7 7h16v16H7z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TimeIcon;
