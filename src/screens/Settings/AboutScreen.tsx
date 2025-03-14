import { Box, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Layout } from '../../navigator/Layout';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import TabHeader from '../../components/TabHeader';
import { useNavigation } from '@react-navigation/native';
import AboutAppSreen from '../../assets/icons/Settings/AboutScreen/AboutAppicon';
import OtherAppsIcon from '../../assets/icons/Settings/AboutScreen/OtherAppsIcon';
import { useTranslation } from 'react-i18next';
import Text from '../../components/Text/Text';

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
          <Box bgColor="white" borderRadius={20} pb={20} px={20}>
            <AboutAppSreen />
            <Text
              color={palette.greyScale11}
              style={{
                fontSize: 15,
                textAlign: 'center',
                lineHeight: 25,
                paddingTop: 20,
              }}
            >
              BeeApp – Құран оқуды нөлден үйренуге арналған заманауи қосымша.
              <Text
                color={palette.greyScale11}
                style={{ fontSize: 13, textAlign: 'left' }}
              >
                {
                  '\n\n• Оқуды жеңілдететін методика мен геймификация \n• Оқығаныңызды тексеретін жасанды интеллект \n• Жаңадан үйренушілерге ыңғайлы тәжуид жүйесі \n• Құран-ридер және әр аятты бөлек тыңдау мүмкіндігі бар аудио нұсқа'
                }
              </Text>
            </Text>
          </Box>
          <Text color={palette.greyScale11} style={{ fontSize: 15 }}>
            1.1 нұсқасы
          </Text>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default AboutScreen;
