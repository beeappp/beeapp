import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const ActiveExerciseMicroIcon = (props: SvgProps) => (
  <Svg width={130} height={130} fill="none" {...props}>
    <Circle cx={65} cy={65} r={65} fill="#E6E6E6" />
    <Path
      stroke="#262626"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      strokeWidth={4.75}
      d="M46 55.5V65c0 10.494 8.506 19 19 19m0 0c10.493 0 19-8.507 19-19v-9.5M65 84v14.25m9.5-57V65a9.5 9.5 0 0 1-19 0V41.25a9.5 9.5 0 0 1 19 0Z"
    />
  </Svg>
);
export default ActiveExerciseMicroIcon;
