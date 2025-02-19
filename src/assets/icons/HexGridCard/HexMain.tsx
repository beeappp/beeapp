import { View } from '@gluestack-ui/themed';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import Text from '../../../components/Text/Text';
import { StyleSheet } from 'react-native';
import { typography } from '../../../theme/typography';

type HexSecondaryIconProps = SvgProps & {
  roundNumber?: string; // Optional roundNumber prop
};

const HexMainIcon: React.FC<HexSecondaryIconProps> = ({
  roundNumber,
  ...props
}) => (
  <View justifyContent="center" alignItems="center">
    <Svg width={77} height={72} fill="none" {...props}>
      <Path
        fill="#fff"
        d="M8.847 15.35c3.223-5.603 4.834-8.405 7.091-10.44A19.103 19.103 0 0 1 22.848.92c2.892-.936 6.125-.93 12.59-.919l5.927.011c6.49.012 9.734.017 12.642.97a19.389 19.389 0 0 1 6.956 4.037c2.276 2.055 3.906 4.878 7.167 10.525l2.905 5.03c3.26 5.646 4.891 8.469 5.534 11.467.568 2.653.575 5.392.019 8.041-.629 2.994-2.246 5.806-5.48 11.43l-2.955 5.136c-3.223 5.604-4.834 8.406-7.091 10.441a19.103 19.103 0 0 1-6.91 3.989c-2.892.936-6.125.93-12.59.919l-5.927-.011c-6.49-.012-9.734-.017-12.641-.97a19.39 19.39 0 0 1-6.957-4.037c-2.276-2.055-3.906-4.879-7.167-10.525l-2.905-5.03C2.705 45.78 1.074 42.956.431 39.958a19.376 19.376 0 0 1-.019-8.041c.629-2.994 2.246-5.806 5.48-11.43l2.955-5.136Z"
      />
    </Svg>
    <Text
      style={{
        position: 'absolute',
        fontFamily: typography.bold,
        fontSize: 36,
        color: '#E3A02C',
      }}
    >
      {roundNumber}
    </Text>
  </View>
);

export default HexMainIcon;
