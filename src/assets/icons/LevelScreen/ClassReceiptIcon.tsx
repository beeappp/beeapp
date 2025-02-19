import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import LevelGridIcon from './LevelGridIcon';
const ClassReceiptIcon = (props: SvgProps) => (
  <Svg width={24} height={29} fill="none" {...props}>
    <Path
      fill="#333"
      fillRule="evenodd"
      d="M18 7.715H6A.856.856 0 1 1 6 6h12a.857.857 0 1 1 0 1.715Zm0 5.124H6a.857.857 0 0 1 0-1.715h12a.856.856 0 1 1 0 1.715ZM18 18H6a.856.856 0 1 1 0-1.714h12A.856.856 0 1 1 18 18ZM20.571.857H3.43A3.429 3.429 0 0 0 0 4.286v24h1.6l3.543-2.571 3.428 2.571L12 25.715l3.429 2.571 3.428-2.571 3.544 2.571H24v-24A3.429 3.429 0 0 0 20.571.857Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ClassReceiptIcon;
