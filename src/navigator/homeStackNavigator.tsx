import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { noHeaderStyle } from './appNavigator';
import HomeScreen from '../screens/Home';

export type HomeParamList = {
  HomeStack: undefined;
  ClassLevel: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<HomeParamList>;

const HomeStack = createNativeStackNavigator<HomeParamList>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeStack">
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={noHeaderStyle}
      />
    </HomeStack.Navigator>
  );
};
export default HomeStackScreen;
