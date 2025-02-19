import { Text, View } from '@gluestack-ui/themed';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { typography } from '../../../theme/typography';
import { palette } from '../../../theme/palette';

type HexSecondaryIconProps = SvgProps & {
  roundNumber?: string; // Optional roundNumber prop
};

const HexSecondarIcon: React.FC<HexSecondaryIconProps> = ({
  roundNumber,
  ...props
}) => (
  <View justifyContent="center" alignItems="center">
    <Svg width={57} height={54} fill="none" {...props}>
      <Path
        fill="#fff"
        d="M6.549 11.513c2.386-4.203 3.579-6.304 5.25-7.83A14.1 14.1 0 0 1 16.912.69c2.141-.702 4.534-.698 9.32-.69l4.388.009c4.804.008 7.206.013 9.358.727a14.31 14.31 0 0 1 5.15 3.028c1.684 1.542 2.891 3.659 5.305 7.894l2.15 3.772c2.414 4.235 3.621 6.352 4.097 8.6.42 1.99.425 4.045.014 6.032-.466 2.245-1.663 4.354-4.057 8.572l-2.187 3.852c-2.386 4.203-3.579 6.304-5.25 7.83a14.099 14.099 0 0 1-5.114 2.992c-2.141.702-4.534.698-9.32.69l-4.388-.009c-4.804-.009-7.206-.013-9.358-.727a14.309 14.309 0 0 1-5.15-3.028c-1.684-1.541-2.891-3.659-5.305-7.894l-2.15-3.772C2.002 34.334.795 32.217.319 29.97a14.719 14.719 0 0 1-.014-6.032c.466-2.245 1.663-4.354 4.057-8.572l2.187-3.852Z"
        opacity={0.3}
      />
    </Svg>
    {roundNumber && (
      <Text
        style={{
          position: 'absolute',
          fontFamily: typography.bold,
          fontSize: 24,
          color: palette.white,
        }}
      >
        {roundNumber}
      </Text>
    )}
  </View>
);
export default HexSecondarIcon;
