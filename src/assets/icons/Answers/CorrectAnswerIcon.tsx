import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const CorrcetAnswerIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Circle cx={11} cy={11} r={11} fill="#fff" />
    <Path
      fill="#434343"
      stroke="#434343"
      strokeWidth={0.417}
      d="m15.348 6.829-.17-.119-.12.171-5.063 7.292-3.27-2.67-.162-.132-.132.162-.592.726-.132.161.161.132 4.23 3.453.174.143.129-.185 5.77-8.31.119-.17-.171-.12-.77-.534Z"
    />
  </Svg>
);
export default CorrcetAnswerIcon;
