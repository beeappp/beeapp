import { HStack, View } from '@gluestack-ui/themed';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Animated, TouchableOpacity } from 'react-native';
import styles from './styles';
import Text from '../Text/Text';
import { palette } from '../../theme/palette';

const TopBar = ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
  return (
    <View paddingHorizontal={21} marginBottom={25}>
      <HStack style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[
                styles.labelItem,
                { backgroundColor: isFocused ? palette.white : undefined },
              ]}
            >
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: isFocused ? palette.black : palette.white },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );
};

export default TopBar;
