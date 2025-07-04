import * as React from 'react';
import Svg, { SvgProps, Path, G, Defs, ClipPath } from 'react-native-svg';

type UnfinishedCourseProps = SvgProps & {
  color?: string;
};
const UnfinishedCourseIcon: React.FC<UnfinishedCourseProps> = ({
  color,
  ...props
}) => (
  <Svg width={22} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M1.686 14.278C.762 12.719.3 11.94.12 11.11a5.21 5.21 0 0 1 0-2.223C.3 8.06.762 7.281 1.686 5.722l.846-1.428c.927-1.564 1.39-2.346 2.039-2.915A5.55 5.55 0 0 1 6.557.263C7.387 0 8.317 0 10.173 0h1.654c1.857 0 2.785 0 3.616.263a5.551 5.551 0 0 1 1.986 1.116c.65.569 1.112 1.35 2.04 2.915l.845 1.428c.924 1.559 1.385 2.338 1.566 3.166.16.733.16 1.49 0 2.223-.18.829-.642 1.608-1.566 3.167l-.846 1.428c-.927 1.564-1.39 2.346-2.039 2.915a5.552 5.552 0 0 1-1.986 1.116c-.83.263-1.76.263-3.616.263h-1.654c-1.857 0-2.785 0-3.616-.263a5.551 5.551 0 0 1-1.986-1.116c-.65-.569-1.112-1.35-2.039-2.915l-.846-1.428Z"
    />
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M10.775 2.5h-.6l.15 1.5h.975c3 .225 5.475 2.625 5.625 5.7.15 3.3-2.4 6.15-5.7 6.3h-.9l-.075 1.5h1.275A7.538 7.538 0 0 0 18.5 9.7c-.15-3.825-3.225-6.825-6.975-7.125h-.375C11 2.5 10.925 2.5 10.775 2.5Zm-2.625.525c-.375.225-.75.375-1.125.6L7.85 4.9c.225-.15.525-.3.825-.45L8.15 3.025ZM5.375 5.05c-.3.3-.525.675-.75.975l1.275.75c.15-.225.375-.45.6-.75L5.375 5.05ZM13.55 7.3l-3.45 3.9-2.025-1.575L7.25 10.9l3.15 2.4 4.35-4.95-1.2-1.05Zm-9.75.45c-.15.375-.225.825-.225 1.2l1.5.225c.075-.3.075-.675.225-.975l-1.5-.45Zm1.275 3-1.5.15v.225c.075.3.15.675.225.975l1.425-.45a2.696 2.696 0 0 1-.15-.825v-.075Zm.825 2.4-1.275.825c.225.375.45.675.75.975l1.125-.975c-.225-.3-.45-.525-.6-.825Zm1.95 1.95-.825 1.275c.375.225.75.375 1.125.6l.6-1.35c-.375-.225-.675-.375-.9-.525Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 1h18v18H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default UnfinishedCourseIcon;
