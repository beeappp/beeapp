import { VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Layout } from '../../navigator/Layout';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import TabHeader from '../../components/TabHeader';
import { useNavigation } from '@react-navigation/native';
import AboutAppSreen from '../../assets/icons/Settings/AboutScreen/AboutAppicon';
import OtherAppsIcon from '../../assets/icons/Settings/AboutScreen/OtherAppsIcon';
import { useTranslation } from 'react-i18next';

const AboutScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  return (
    <Layout bottom top padding>
      <VStack flex={1}>
        <TabHeader
          variant={'leftArrow'}
          gradient={palette.arrowGradient2}
          headerScreenTitle={t('setting_about')}
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
        <VStack flex={1} alignItems="center" justifyContent="space-between">
          <AboutAppSreen />
          <OtherAppsIcon />
        </VStack>
      </VStack>
    </Layout>
  );
};

export default AboutScreen;
