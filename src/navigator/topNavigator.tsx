import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SuralarScreen from '../screens/ReadKuran/Suralar';
import ParalarScreen from '../screens/ReadKuran/Paralar';
import { palette } from '../theme/palette';
import TopBar from '../components/TopBar';
import { useTranslation } from 'react-i18next';

type TopNavigatorParamList = {
  Suralar: undefined;
  Paralar: undefined;
};

const Tab = createMaterialTopTabNavigator<TopNavigatorParamList>();
export type TabNavigatorScreenProps =
  NativeStackScreenProps<TopNavigatorParamList>;

const TopNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      tabBar={props => <TopBar {...props} />}
      backBehavior="history"
      initialRouteName={'Suralar'}
      style={{ backgroundColor: palette.lightDark2 }}
    >
      <Tab.Screen
        name="Suralar"
        component={SuralarScreen}
        options={{
          title: t('suralar'),
        }}
      />
      <Tab.Screen
        name="Paralar"
        component={ParalarScreen}
        options={{
          title: t('paralar'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TopNavigator;
