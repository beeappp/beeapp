import { HStack, Switch, VStack } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../navigator/Layout';
import TabHeader from '../../components/TabHeader';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import Text from '../../components/Text/Text';
import { StyleSheet } from 'react-native';
import { load, save } from '../../utils/storage';
import { useTranslation } from 'react-i18next';

const NotificationSettingScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    save('notify', !isEnabled);
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    const getValue = async () => {
      const value = await load('notify');
      if (value == false) setIsEnabled(false);
      else {
        setIsEnabled(true);
      }
    };
    getValue();
  }, []);

  return (
    <Layout bottom top padding>
      <VStack flex={1}>
        <TabHeader
          variant={'leftArrow'}
          gradient={palette.arrowGradient2}
          headerScreenTitle={t('enable_notice')}
          textStyle={{
            fontFamily: typography.medium,
            fontSize: 20,
            color: palette.lightDark,
            textAlign: 'center',
            lineHeight: 25,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <HStack style={styles.container}>
          <Text style={styles.label}>{t('push_notice')}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </HStack>
      </VStack>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    backgroundColor: palette.white,
    borderRadius: 20,
    shadowColor: '#000',
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: typography.medium,
    color: palette.lightDark,
  },
});

export default NotificationSettingScreen;
