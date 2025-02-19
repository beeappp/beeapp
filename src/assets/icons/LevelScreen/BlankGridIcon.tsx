import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const BlankGridIcon = (props: SvgProps) => (
  <Svg width={114} height={126} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.7}
      d="M66.954 123.063a19.998 19.998 0 0 1-20 0L10 101.728a20 20 0 0 1-10-17.32v-42.67a20 20 0 0 1 10-17.321L46.954 3.08a20 20 0 0 1 20 0l36.954 21.336a20 20 0 0 1 10 17.32v42.67a20 20 0 0 1-10 17.321l-36.954 21.335Z"
      opacity={0.77}
    />
  </Svg>
);
export default BlankGridIcon;
