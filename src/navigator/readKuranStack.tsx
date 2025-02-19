import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { noHeaderStyle } from './appNavigator';
import ReadKuranScreen from '../screens/ReadKuran';
import KuranTextScreen from '../screens/ReadKuran/KuranText';
import KuranSettingsScreen from '../screens/ReadKuran/KuranSettings';

export type ReadKuranParamList = {
  ReadKuran: undefined;
  KuranText: undefined;
  KuranSettings: undefined;
};

export type ReadKuranScreenProps = NativeStackScreenProps<ReadKuranParamList>;

const ReadKuranStack = createNativeStackNavigator<ReadKuranParamList>();

const ReadKuranStackScreen = () => {
  return (
    <ReadKuranStack.Navigator initialRouteName="ReadKuran">
      <ReadKuranStack.Screen
        name="ReadKuran"
        component={ReadKuranScreen}
        options={noHeaderStyle}
      />
      <ReadKuranStack.Screen
        name="KuranText"
        component={KuranTextScreen}
        options={noHeaderStyle}
      />
      <ReadKuranStack.Screen
        name="KuranSettings"
        component={KuranSettingsScreen}
        options={noHeaderStyle}
      />
    </ReadKuranStack.Navigator>
  );
};
export default ReadKuranStackScreen;
