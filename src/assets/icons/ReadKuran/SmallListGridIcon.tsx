import { Text, View } from '@gluestack-ui/themed';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { palette } from '../../../theme/palette';
import { typography } from '../../../theme/typography';

type ListGridProps = SvgProps & {
  roundNumber?: string;
};
const SmallListGridicon: React.FC<ListGridProps> = ({
  roundNumber,
  ...props
}) => (
  <View alignItems="center" justifyContent="center">
    {/* <Svg width={27} height={25} fill="none" {...props}> */}
    <Svg width={35} height={30} viewBox="0 0 27 25" fill="none" {...props}>
      <Path
        stroke="#C6C6C8"
        strokeWidth={0.5}
        d="m2.285 7.279 1.038-1.786C4.47 3.523 5.016 2.588 5.776 1.91A6.53 6.53 0 0 1 8.124.566C9.097.253 10.189.25 12.485.25h2.03c2.296 0 3.388.003 4.361.316a6.53 6.53 0 0 1 2.348 1.344c.76.678 1.307 1.613 2.453 3.583l1.038 1.786c1.142 1.963 1.682 2.897 1.893 3.884a6.383 6.383 0 0 1 0 2.674c-.211.987-.751 1.921-1.893 3.884l-1.038 1.786c-1.146 1.97-1.693 2.905-2.453 3.583a6.53 6.53 0 0 1-2.348 1.344c-.973.313-2.065.316-4.361.316h-2.03c-2.296 0-3.388-.003-4.361-.316a6.53 6.53 0 0 1-2.348-1.344c-.76-.678-1.307-1.613-2.453-3.583l-1.038-1.786C1.143 15.758.603 14.824.392 13.837a6.381 6.381 0 0 1 0-2.674c.211-.987.751-1.921 1.893-3.884Z"
      />
    </Svg>
    <View position="absolute">
      <Text
        color={palette.black}
        style={{ fontFamily: typography.medium, fontSize: 10 }}
      >
        {roundNumber}
      </Text>
    </View>
  </View>
);
export default SmallListGridicon;
