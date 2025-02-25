import React, { useEffect } from 'react';
import { palette } from '../theme/palette';

// navigator
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

//Toast
import Toast from 'react-native-toast-message';
import toastConfig from '../components/CustomToast';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import TrackPlayer from 'react-native-track-player';
import PrivateNavigator, { PrivateStackParamList } from './privateNavigator';
import PublicNavigator, { PublicStackParamList } from './publicNavigator';

import { load, remove } from '../utils/storage';
import { setAuthHeader } from '../init/axios/baseService';
import { useMainQuran } from '../store/mainQuran';
import { useCourses } from '../store/courses';
import { useUser } from '../store/user';

export type AppStackScreenProps = NativeStackScreenProps<
  PrivateStackParamList & PublicStackParamList,
  'TabNavigator'
>;

export const noHeaderStyle = {
  headerShown: false,
};
export const gestureDisabled = { gestureEnabled: false };

const AppNavigator = () => {
  const { isAuthorized, setAuthorize } = useUser();
  const { getSurahs, getJuzs } = useMainQuran();
  const { getCourses } = useCourses();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.background,
    },
  };

  // useEffect(() => {
  //   const setupPlayer = async () => {

  //   };
  //   setupPlayer();

  //   setTimeout(() => {
  //     LottieSplashScreen.hide();
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await TrackPlayer.setupPlayer();
        const token = await load('accessToken');
        if (token) {
          setAuthHeader(token);
          try {
            await getCourses(1);
            await getSurahs();
            await getJuzs();

            setAuthorize(true);
          } catch {
            remove('accessToken');
            console.log('error in retrieving data');
          }
        }
      } catch (error) {
        console.log(error, 'get data failed');
      } finally {
        setTimeout(() => {
          LottieSplashScreen.hide();
        }, 3000);
      }
    };
    init();
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      {isAuthorized ? <PrivateNavigator /> : <PublicNavigator />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default AppNavigator;
