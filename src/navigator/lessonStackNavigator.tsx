import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { noHeaderStyle } from './appNavigator';
import VideoLessonScreen from '../screens/VideoLesson';
import ExerciseScreen from '../screens/ExerciseScreen';
import { Platform } from 'react-native';

// import ExerciseScreen from '../screens/ExerciseScreenOrig';

export type LessonParamList = {
  VideoLesson: undefined;
  Exercise: undefined;
  LessonStack: { screen: keyof LessonParamList };
};

export type LessonScreenProps = NativeStackScreenProps<LessonParamList>;

const LessonStack = createNativeStackNavigator<LessonParamList>();

const LessonStackScreen = () => {
  return (
    <LessonStack.Navigator
      screenOptions={{
        navigationBarHidden: Platform.OS == 'android' ? true : false,
      }}
    >
      <LessonStack.Screen
        name="VideoLesson"
        component={VideoLessonScreen}
        options={noHeaderStyle}
      />
      <LessonStack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={noHeaderStyle}
      />
    </LessonStack.Navigator>
  );
};
export default LessonStackScreen;
