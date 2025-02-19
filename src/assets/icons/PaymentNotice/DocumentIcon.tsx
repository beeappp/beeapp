import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
const DocumentIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path fill="#1E1E1E" d="M0 0h30v30H0z" />
    <Rect width={375} height={812} x={-24} y={-519} fill="#fff" rx={30} />
    <Rect width={30} height={30} fill="#434343" rx={10} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.39}
      d="M19 21.666h-8a1.333 1.333 0 0 1-1.333-1.333V9.667A1.333 1.333 0 0 1 11 8.332h4.733a1.333 1.333 0 0 1 1 .4L20 12.2c.227.257.346.59.333.933v7.2A1.333 1.333 0 0 1 19 21.667ZM12.267 18.667h5.466M12.267 16h5.466M12.333 13.333h3.334"
    />
  </Svg>
);
export default DocumentIcon;
