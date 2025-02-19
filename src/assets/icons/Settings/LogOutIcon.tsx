import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const LogOutIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} fill="#F24A4E" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M16.333 20.334H11A1.333 1.333 0 0 1 9.667 19v-8c0-.736.597-1.333 1.333-1.333h5.333M13.667 15H21m0 0-2 2m2-2-2-2"
    />
  </Svg>
);
export default LogOutIcon;
