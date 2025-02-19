import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const BlankMediumIcon = (props: SvgProps) => (
  <Svg width={66} height={74} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.7}
      d="M36.557 72.107a7.597 7.597 0 0 1-7.597 0L3.951 57.668a7.597 7.597 0 0 1-3.798-6.58V22.212a7.597 7.597 0 0 1 3.798-6.58l25.01-14.438a7.597 7.597 0 0 1 7.596 0l25.01 14.439a7.597 7.597 0 0 1 3.798 6.58v28.877a7.597 7.597 0 0 1-3.799 6.58L36.557 72.106Z"
      opacity={0.77}
    />
  </Svg>
);
export default BlankMediumIcon;
