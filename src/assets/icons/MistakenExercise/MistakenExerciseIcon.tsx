import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const MistakenExerciseIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Circle cx={11} cy={11} r={11} fill="#333" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="M12.166 8.083h1.167a3.5 3.5 0 0 1 0 7H8.666a3.5 3.5 0 0 1 0-7h1.167m0 0-1.75-1.75m1.75 1.75-1.75 1.75"
    />
  </Svg>
);
export default MistakenExerciseIcon;
