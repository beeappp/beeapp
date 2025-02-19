import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const ExerciseMicroIcon = (props: SvgProps) => (
  <Svg width={130} height={130} fill="none" {...props}>
    <Circle cx={65} cy={65} r={65} fill="#fff" />
    <Path
      stroke="#434343"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.75}
      d="M46 55.75v9.5c0 10.494 8.507 19 19 19m0 0c10.493 0 19-8.507 19-19v-9.5m-19 28.5V98.5m9.5-57v23.75a9.5 9.5 0 0 1-19 0V41.5a9.5 9.5 0 0 1 19 0Z"
    />
  </Svg>
);
export default ExerciseMicroIcon;
