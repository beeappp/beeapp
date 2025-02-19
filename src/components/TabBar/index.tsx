import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { HStack } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// styles
import styles from './styles';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
//icons
import HomeIcon from '../../assets/icons/TabBar/HomeIcon';
import HomeFocusedIcon from '../../assets/icons/TabBar/HomeFocusedIcon';
import ReadKuranIcon from '../../assets/icons/TabBar/ReadKuranIcon';
import ReadKuranFocusedIcon from '../../assets/icons/TabBar/ReadKuranFocusedIcon';
import SettingsIcon from '../../assets/icons/TabBar/SettingsIcon';
import SettingsFocusedicon from '../../assets/icons/TabBar/SettingsFocusedicon';
import LevelScreenIcon from '../../assets/icons/TabBar/LevelScreenIcon';
import LevelScreenFocusedIcon from '../../assets/icons/TabBar/LevelScreenFocusedIcon';

type Route = {
  key: string;
  name: string;
};

export const tabBarIcons: Record<
  string,
  { default: JSX.Element; focused: JSX.Element }
> = {
  home: {
    default: <HomeIcon />,
    focused: <HomeFocusedIcon />,
  },
  classlevel: {
    default: <LevelScreenIcon />,
    focused: <LevelScreenFocusedIcon />,
  },
  readkuran: {
    default: <ReadKuranIcon />,
    focused: <ReadKuranFocusedIcon />,
  },
  settings: {
    default: <SettingsIcon />,
    focused: <SettingsFocusedicon />,
  },
};

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <HStack
      style={styles.container}
      paddingBottom={Platform.OS === 'android' ? bottom : bottom - 8}
    >
      {state.routes.map((route: Route, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            style={{ paddingTop: 26 }}
            hitSlop={{ top: 0, bottom: 30, left: 30, right: 30 }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
            onPress={onPress}
            activeOpacity={1}
          >
            {isFocused
              ? tabBarIcons[route.name.toLowerCase()].focused
              : tabBarIcons[route.name.toLowerCase()].default}
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default TabBar;
