import React from 'react';
import { Platform } from 'react-native';

// navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import WelcomeScreen from '../screens/Welcome';
import RegisterFormScreen from '../screens/RegisterForm';
import CodeConfermationScreen from '../screens/CodeConfirmation';
import LoginScreen from '../screens/Login';

export type PublicStackParamList = {
  Welcome: undefined;
  RegisterForm: undefined;
  CodeConfermation: undefined;
  Login: undefined;
};

export const noHeaderStyle = {
  headerShown: false,
};
export const gestureDisabled = { gestureEnabled: false };

const PublicNavigator = () => {
  const Stack = createNativeStackNavigator<PublicStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarHidden: Platform.OS == 'android' ? true : false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterFormScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="CodeConfermation"
        component={CodeConfermationScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ ...noHeaderStyle, ...gestureDisabled }}
      />
    </Stack.Navigator>
  );
};

export default PublicNavigator;
