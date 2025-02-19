import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const Coloricon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M21.72 15.48c0 2.385-3.009 4.32-6.72 4.32s-6.72-1.935-6.72-4.32c0-2.386 3.009-4.32 6.72-4.32s6.72 1.934 6.72 4.32Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M16.68 15.48a1.681 1.681 0 1 1-3.36 0 1.68 1.68 0 1 1 3.36 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Coloricon;
