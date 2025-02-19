import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const RightArrowIcon = (props: SvgProps) => (
  <Svg width={10} height={17} fill="none" {...props}>
    <Path
      fill="#333"
      stroke="#333"
      strokeWidth={0.3}
      d="m1.07 1.761 7.249 6.557c.066.06.09.124.09.179a.242.242 0 0 1-.09.178l-7.248 6.33-.002.002a.674.674 0 0 0-.071.918l.005.006c.241.265.65.29.918.071L1.925 16l7.249-6.35c.703-.62.724-1.661.02-2.303L1.945.79a.654.654 0 1 0-.876.971Z"
    />
  </Svg>
);
export default RightArrowIcon;
