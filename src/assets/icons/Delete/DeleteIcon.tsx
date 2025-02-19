import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const DeleteIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        fillOpacity={0.3}
        d="M17.68 8.996c0 4.912-4.005 8.995-8.84 8.995-4.827 0-8.84-4.083-8.84-8.995C0 4.074 4.004 0 8.831 0c4.836 0 8.848 4.074 8.848 8.996ZM11.274 5.52 8.84 7.98 6.422 5.53a.68.68 0 0 0-.494-.203.704.704 0 0 0-.71.723c0 .194.068.37.207.511l2.4 2.443-2.4 2.452a.699.699 0 0 0-.208.512c0 .405.312.732.71.732.2 0 .382-.07.52-.212l2.393-2.452 2.4 2.452a.68.68 0 0 0 .512.212.726.726 0 0 0 .727-.732.68.68 0 0 0-.216-.52l-2.4-2.444 2.409-2.451a.688.688 0 0 0 .216-.52.716.716 0 0 0-.72-.724.65.65 0 0 0-.493.212Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DeleteIcon;
