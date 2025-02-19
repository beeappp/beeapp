import { Text, View } from '@gluestack-ui/themed';
import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
import { typography } from '../../../theme/typography';
import { palette } from '../../../theme/palette';

type ListGridProps = SvgProps & {
  roundNumber?: string;
};
const ListGridIcon: React.FC<ListGridProps> = ({ roundNumber, ...props }) => (
  <View alignItems="center" justifyContent="center">
    <Svg width={32} height={30} fill="none" {...props}>
      <Mask
        id="a"
        width={32}
        height={30}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
      >
        <Path
          fill="#fff"
          d="M2.452 21.416C1.109 19.08.437 17.91.174 16.667a8.055 8.055 0 0 1 0-3.334c.263-1.243.935-2.412 2.278-4.75l1.23-2.142c1.349-2.346 2.023-3.52 2.966-4.373A8.011 8.011 0 0 1 9.538.394C10.745 0 12.095 0 14.796 0h2.406c2.7 0 4.051 0 5.26.394 1.07.349 2.053.92 2.889 1.674.943.853 1.617 2.027 2.965 4.373l1.231 2.143c1.343 2.337 2.015 3.506 2.278 4.749a8.058 8.058 0 0 1 0 3.334c-.263 1.243-.935 2.412-2.278 4.75l-1.23 2.142c-1.349 2.346-2.023 3.52-2.966 4.373a8.012 8.012 0 0 1-2.89 1.674C21.255 30 19.905 30 17.204 30h-2.406c-2.7 0-4.051 0-5.26-.394a8.012 8.012 0 0 1-2.889-1.674c-.943-.853-1.617-2.026-2.965-4.373l-1.231-2.143Z"
        />
      </Mask>
      <G fill="#434343" mask="url(#a)">
        <Path d="M0-1h16v16H0zM0 15h16v16H0zM16-1h16v16H16zM16 15h16v16H16z" />
      </G>
    </Svg>
    <View position="absolute">
      <Text
        color={palette.white}
        style={{ fontFamily: typography.bold, fontSize: 12 }}
      >
        {roundNumber}
      </Text>
    </View>
  </View>
);
export default ListGridIcon;
