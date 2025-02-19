import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const PaymnetNoticeIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m15.667 8.334-5.938 7.125c-.233.279-.349.418-.35.536-.002.103.043.2.123.264.092.075.273.075.637.075H15l-.667 5.333 5.938-7.125c.232-.28.349-.419.35-.537a.334.334 0 0 0-.123-.264c-.092-.074-.274-.074-.637-.074H15l.667-5.333Z"
    />
  </Svg>
);
export default PaymnetNoticeIcon;
