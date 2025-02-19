import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const InfoAdditionalIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M8.84 14.12v1.76a5.28 5.28 0 0 0 5.28 5.28h1.76a5.28 5.28 0 0 0 5.28-5.28v-1.76a5.28 5.28 0 0 0-5.28-5.28h-1.76a5.28 5.28 0 0 0-5.28 5.28Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.2}
      d="M15 15v3.52"
    />
    <Path fill="#fff" d="M15 12.8a.44.44 0 1 1 .001-.881.44.44 0 0 1 0 .88Z" />
    <Path fill="#fff" d="M15 11.48a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76Z" />
  </Svg>
);
export default InfoAdditionalIcon;
