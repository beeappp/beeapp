import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const CorrectRecordIcon = (props: SvgProps) => (
  <Svg width={161} height={161} fill="none" {...props}>
    <Circle cx={80.5} cy={80.5} r={80.5} fill="#333" fillOpacity={0.5} />
    <Circle cx={81} cy={81} r={65} fill="#434343" />
    <Circle cx={81} cy={81} r={52.5} stroke="#fff" strokeWidth={3} />
    <Path
      fill="#fff"
      d="M101.302 60.197 76.379 96.084 59.845 82.585 57 86.072l20.302 16.575L105 62.763l-3.698-2.566Z"
    />
  </Svg>
);
export default CorrectRecordIcon;
