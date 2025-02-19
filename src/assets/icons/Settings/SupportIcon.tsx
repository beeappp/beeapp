import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const SupportIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10.417 21.417a1.833 1.833 0 0 1-1.833-1.834v-2.75a1.833 1.833 0 0 1 3.666 0v2.75c0 1.013-.82 1.834-1.833 1.834ZM19.583 21.417a1.833 1.833 0 0 1-1.833-1.834v-2.75a1.833 1.833 0 0 1 3.667 0v2.75c0 1.013-.821 1.834-1.834 1.834Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M21.417 16.834V15a6.417 6.417 0 1 0-12.833 0v1.834"
    />
  </Svg>
);
export default SupportIcon;
