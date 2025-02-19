import { View, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Layout } from '../../navigator/Layout';
import { Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopNavigator from '../../navigator/topNavigator';
import Text from '../../components/Text/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import { useTranslation } from 'react-i18next';

const ReadKuranStack = createNativeStackNavigator<any>();

const ReadKuranScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  return (
    <VStack style={styles.container} pt={top}>
      <VStack style={styles.header}>
        <Text style={styles.headerText}>{t('quran')}</Text>
      </VStack>

      <View style={styles.tabContainer} overflow="hidden">
        <ReadKuranStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialRouteName={'KuranNavigator'}
        >
          <ReadKuranStack.Screen
            name={'KuranNavigator'}
            component={TopNavigator}
          />
        </ReadKuranStack.Navigator>
      </View>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.lightDark2,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? 20 : undefined,
  },
  headerText: {
    color: palette.white,
    fontFamily: typography.medium,
    fontSize: 20,
    lineHeight: 52,
  },
  tabContainer: { flex: 1 },
});
export default ReadKuranScreen;
