import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const WrongAnswerIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Circle cx={11} cy={11} r={11} fill="#fff" />
    <Path
      fill="#434343"
      fillRule="evenodd"
      d="M16 6.92 15.08 6 11 10.086 6.92 6 6 6.92 10.086 11 6 15.08l.92.92L11 11.914 15.08 16l.92-.92L11.914 11 16 6.92Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default WrongAnswerIcon;
