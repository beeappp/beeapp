import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type AccessableProps = SvgProps & {
  color?: string;
};
const AccessableIcon: React.FC<AccessableProps> = ({ color, ...props }) => (
  <Svg width={22} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M1.686 14.278C.762 12.719.3 11.94.12 11.11a5.21 5.21 0 0 1 0-2.223C.3 8.06.762 7.281 1.686 5.722l.846-1.428c.927-1.564 1.39-2.346 2.039-2.915A5.55 5.55 0 0 1 6.557.263C7.387 0 8.317 0 10.173 0h1.654c1.857 0 2.785 0 3.616.263a5.551 5.551 0 0 1 1.986 1.116c.65.569 1.112 1.35 2.04 2.915l.845 1.428c.924 1.559 1.385 2.338 1.566 3.166.16.733.16 1.49 0 2.223-.18.829-.642 1.608-1.566 3.167l-.846 1.428c-.927 1.564-1.39 2.346-2.039 2.915a5.552 5.552 0 0 1-1.986 1.116c-.83.263-1.76.263-3.616.263h-1.654c-1.857 0-2.785 0-3.616-.263a5.551 5.551 0 0 1-1.986-1.116c-.65-.569-1.112-1.35-2.039-2.915l-.846-1.428Z"
    />
    <Path
      fill={color}
      stroke={color}
      strokeWidth={0.417}
      d="m15.348 5.829-.17-.119-.12.171-5.063 7.292-3.27-2.67-.162-.132-.132.162-.592.726-.132.162.161.131 4.23 3.453.174.143.129-.185 5.77-8.31.119-.17-.171-.12-.77-.534Z"
    />
  </Svg>
);
export default AccessableIcon;
