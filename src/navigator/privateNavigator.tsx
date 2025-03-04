import React from 'react';
import { Platform } from 'react-native';

// navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator, { TabNavigatorParamList } from './tabNavigator';

//screens
import LessonStackScreen from './lessonStackNavigator';
import KuranTextScreen from '../screens/ReadKuran/KuranText';
import KuranSettingsScreen from '../screens/ReadKuran/KuranSettings';
import PaymentNoticeScreen from '../screens/PaymentNotice';
import NotificationSettingScreen from '../screens/Settings/NotificationSettingScreen';
import AboutScreen from '../screens/Settings/AboutScreen';
import ColorChangeScreen from '../screens/Settings/ColorChangeScreen';

export type PrivateStackParamList = {
  TabNavigator: { screen: keyof TabNavigatorParamList } | undefined;
  PaymentNotice: { fromSetting: boolean } | undefined;
  LessonStack: undefined;
  KuranText?: {
    surah_Id: number;
    name: string;
    juz_Id?: number;
    ayiatNumber: number;
  };
  KuranSettings: undefined;
  NotificationSetting: undefined;
  ColorChange: undefined;
  About: undefined;
  VideoLesson: undefined;
};

export const noHeaderStyle = {
  headerShown: false,
};
export const gestureDisabled = { gestureEnabled: false };

const PrivateNavigator = () => {
  const Stack = createNativeStackNavigator<PrivateStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarHidden: Platform.OS == 'android' ? true : false,
      }}
      initialRouteName="TabNavigator"
    >
      {/* <Stack.Screen
        name="PaymentNotice"
        component={PaymentNoticeScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      /> */}
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSettingScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="ColorChange"
        component={ColorChangeScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="KuranText"
        component={KuranTextScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="KuranSettings"
        component={KuranSettingsScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="LessonStack"
        component={LessonStackScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
    </Stack.Navigator>
  );
};

export default PrivateNavigator;
