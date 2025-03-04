import { View, VStack } from '@gluestack-ui/themed';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { palette } from '../../../theme/palette';
import AccessableIcon from './AccessableIcon';
import LevelLogoIcon from './LoadLogoIcon';
import UnfinishedCourseIcon from './UnfinishedCourseIcon';
import LockIcon from './LockIcon';
import FastImage from 'react-native-fast-image';
import EmptyIcon from './EmptyIcon';

type LevelGridProps = SvgProps & {
  index?: number;
  logo?: boolean;
  halfLock?: boolean;
  color?: string;
  image?: any;
  disabled?: boolean;
  finished?: boolean;
};
const LevelGridIcon: React.FC<LevelGridProps> = ({
  index,
  logo,
  halfLock,
  color,
  image,
  disabled,
  finished,
  ...props
}) => {
  const currentColor = React.useMemo(() => {
    return color;
    if (disabled) {
      return 'rgba(19, 20, 20, 0.25)';
    } else {
      return color;
    }
  }, [color, disabled]);

  return (
    <View justifyContent="center" alignItems="center">
      <Svg width={111} height={122} fill="none" {...props}>
        <Path
          fill={logo ? palette.brownGrey : currentColor}
          d="M65.105 118.626a19.998 19.998 0 0 1-20 0L10 98.358a20 20 0 0 1-10-17.32V40.502a20 20 0 0 1 10-17.32L45.105 2.914a20 20 0 0 1 20 0l35.104 20.268a20 20 0 0 1 10 17.32v40.536a20 20 0 0 1-10 17.32l-35.104 20.268Z"
        />
      </Svg>

      {logo && (
        <View position="absolute" alignItems="center" justifyContent="center">
          <LevelLogoIcon />
        </View>
      )}
      {index && (
        <VStack position="absolute" alignItems="center" justifyContent="center">
          <View w={70} h={70} justifyContent="center" alignItems="center">
            <FastImage
              source={{
                uri: image,
                priority: FastImage.priority.high,
              }}
              style={{ width: '100%', height: '100%' }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View paddingTop={7}>
            {disabled ? (
              <LockIcon color={currentColor} />
            ) : finished ? (
              <AccessableIcon color={currentColor} />
            ) : halfLock ? (
              <UnfinishedCourseIcon color={currentColor} />
            ) : (
              <EmptyIcon />
            )}
          </View>
        </VStack>
      )}
    </View>
  );
};
export default LevelGridIcon;
