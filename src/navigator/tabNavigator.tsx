import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { noHeaderStyle } from './appNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TabBar from '../components/TabBar';

// screens
import HomeStackScreen from './homeStackNavigator';
import ReadKuranScreen from '../screens/ReadKuran';
import SettingsScreen from '../screens/Settings';
import ClassLevelsScreen from '../screens/ClassLevels';

export type TabNavigatorParamList = {
  Home: undefined;
  Menu: undefined;
  ReadKuran: undefined;
  Settings: undefined;
  ClassLevel: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
export type TabNavigatorScreenProps =
  NativeStackScreenProps<TabNavigatorParamList>;

const TabNavigator = () => {
  const tabBarComponent = ({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps) => (
    <TabBar
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      insets={{ top: 0, bottom: 0, left: 0, right: 0 }}
    />
  );
  return (
    <Tab.Navigator
      tabBar={tabBarComponent}
      backBehavior="history"
      initialRouteName={'Home'}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          ...noHeaderStyle,
        }}
      />
      <Tab.Screen
        name="ClassLevel"
        component={ClassLevelsScreen}
        options={noHeaderStyle}
      />

      <Tab.Screen
        name="ReadKuran"
        component={ReadKuranScreen}
        options={noHeaderStyle}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={noHeaderStyle}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
