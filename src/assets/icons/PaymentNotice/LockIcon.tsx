import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
const LockIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path fill="#1E1E1E" d="M0 0h30v30H0z" />
    <Rect width={375} height={812} x={-24} y={-339} fill="#fff" rx={30} />
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.39}
      d="M19 14.333h-8c-.736 0-1.333.597-1.333 1.334v4c0 .736.597 1.333 1.333 1.333h8c.736 0 1.333-.597 1.333-1.333v-4c0-.737-.597-1.334-1.333-1.334Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.39}
      d="M18 14.334v-2C18 10.466 17.667 9 15 9s-3 1.467-3 3.334v2"
    />
  </Svg>
);
export default LockIcon;
