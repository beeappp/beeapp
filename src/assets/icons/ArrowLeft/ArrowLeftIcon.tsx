import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const ArrowLeftIcon = (props: SvgProps) => (
  <Svg width={19} height={15} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        fillOpacity={0.85}
        d="M0 7.495c0 .247.11.475.311.663l6.661 6.555c.2.188.411.277.652.277.492 0 .883-.356.883-.85a.859.859 0 0 0-.25-.623l-2.248-2.255-3.973-3.57-.21.485 3.23.198h12.69c.522 0 .883-.366.883-.88s-.361-.88-.883-.88H5.056l-3.23.198.21.494 3.973-3.58 2.247-2.254a.876.876 0 0 0 .25-.623c0-.494-.39-.85-.882-.85-.24 0-.451.08-.672.297L.311 6.833c-.2.187-.311.415-.311.662Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h19v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowLeftIcon;
