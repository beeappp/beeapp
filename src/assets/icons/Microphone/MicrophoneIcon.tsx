// import { View } from '@gluestack-ui/themed';
// import * as React from 'react';
// import Svg, {
//   SvgProps,
//   G,
//   Path,
//   Defs,
//   ClipPath,
//   Circle,
// } from 'react-native-svg';
// const MicrophoneIcon = (props: SvgProps) => (
//   <View alignItems="center" justifyContent="center">
//     <Svg width={161} height={161} fill="none" {...props}>
//       <Circle cx={80.5} cy={80.5} r={80.5} fill="#fff" fillOpacity={0.4} />
//       <Circle cx={80.5} cy={80.5} r={65} fill="#fff" />
//     </Svg>
//     <View position="absolute">
//       <Svg width={64} height={64} fill="none" {...props}>
//         <G clipPath="url(#a)">
//           <Path
//             fill="#434343"
//             d="M32 8a2.667 2.667 0 0 1 2.649 2.356l.018.31v42.667a2.667 2.667 0 0 1-5.316.311l-.018-.31V10.666A2.667 2.667 0 0 1 32 8Zm-10.667 8A2.667 2.667 0 0 1 24 18.667v26.666a2.667 2.667 0 1 1-5.333 0V18.667A2.667 2.667 0 0 1 21.333 16Zm21.334 0a2.667 2.667 0 0 1 2.666 2.667v26.666a2.667 2.667 0 1 1-5.333 0V18.667A2.667 2.667 0 0 1 42.667 16Zm-32 8a2.667 2.667 0 0 1 2.666 2.667v10.666a2.667 2.667 0 1 1-5.333 0V26.667A2.667 2.667 0 0 1 10.667 24Zm42.666 0a2.667 2.667 0 0 1 2.65 2.356l.017.31v10.667a2.667 2.667 0 0 1-5.315.311l-.018-.31V26.666A2.667 2.667 0 0 1 53.333 24Z"
//           />
//         </G>
//         <Defs>
//           <ClipPath id="a">
//             <Path fill="#fff" d="M0 0h64v64H0z" />
//           </ClipPath>
//         </Defs>
//       </Svg>
//     </View>
//   </View>
// );
// export default MicrophoneIcon;
import * as React from 'react';
import Svg, {
  SvgProps,
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
} from 'react-native-svg';
const MicrophoneIcon = (props: SvgProps) => (
  <Svg width={130} height={130} fill="none" {...props}>
    <Circle cx={65} cy={65} r={65} fill="#fff" />
    <G clipPath="url(#a)">
      <Path
        fill="#434343"
        d="M65 41a2.667 2.667 0 0 1 2.649 2.356l.018.31v42.667a2.667 2.667 0 0 1-5.316.311l-.018-.31V43.666A2.667 2.667 0 0 1 65 41Zm-10.667 8A2.667 2.667 0 0 1 57 51.667v26.666a2.667 2.667 0 1 1-5.333 0V51.667A2.667 2.667 0 0 1 54.333 49Zm21.334 0a2.667 2.667 0 0 1 2.666 2.667v26.666a2.667 2.667 0 1 1-5.333 0V51.667A2.667 2.667 0 0 1 75.667 49Zm-32 8a2.667 2.667 0 0 1 2.666 2.667v10.666a2.667 2.667 0 1 1-5.333 0V59.667A2.667 2.667 0 0 1 43.667 57Zm42.666 0a2.667 2.667 0 0 1 2.65 2.356l.017.31v10.667a2.667 2.667 0 0 1-5.315.311l-.018-.31V59.666A2.667 2.667 0 0 1 86.333 57Z"
      />
    </G>
    <Circle
      cx={65}
      cy={65}
      r={52.5}
      stroke="#C6C6C6"
      strokeOpacity={0.3}
      strokeWidth={3}
    />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M33 33h64v64H33z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MicrophoneIcon;
