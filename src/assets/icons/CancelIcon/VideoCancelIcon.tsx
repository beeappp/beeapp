import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const VideoCancelIcon = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      fill="#fff"
      d="m1.094.186 5.907 5.907L12.908.186c.23-.229.59-.247.84-.053l.068.062a.636.636 0 0 1 0 .9L7.909 7l5.907 5.907c.23.23.247.59.053.84l-.061.068a.636.636 0 0 1-.9 0L7 7.909l-5.907 5.907a.636.636 0 0 1-.84.053l-.068-.061a.636.636 0 0 1 0-.9L6.093 7 .186 1.094a.636.636 0 0 1-.053-.84L.195.187a.636.636 0 0 1 .9 0ZM.636.645 6.993 7 .636 13.358l.009.008L7 7.01l6.357 6.357.008-.008L7.01 7 13.366.645l-.008-.009L7 6.993.645.636.636.645Z"
    />
  </Svg>
);
export default VideoCancelIcon;
