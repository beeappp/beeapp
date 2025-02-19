import React from 'react';
import { VStack, Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { AppStackScreenProps } from '../../navigator/appNavigator';
import { ImageBackground, Platform } from 'react-native';

// styles
import { palette } from '../../theme/palette';

import { Layout } from '../../navigator/Layout';

// components

// utils
import { styles } from './styles';
import TabHeader from '../../components/TabHeader';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';

const WelcomeScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { t } = useTranslation();

  return (
    <Layout>
      <Box flex={1} position="absolute" top={0} bottom={0} left={0} right={0}>
        <ImageBackground
          style={styles.imageBg}
          source={require('../../assets/img/Onboarding/bg.png')}
          resizeMode="cover"
        >
          <Layout padding bottom top>
            <TabHeader />
            <VStack flex={1} alignItems="center" justifyContent="space-between">
              <VStack width={'100%'}>
                <Text
                  color={palette.white}
                  preset="heading4"
                  style={styles.textHeader}
                >
                  {t('welcome')}
                </Text>
              </VStack>

              <VStack
                w={'100%'}
                gap={10}
                marginBottom={Platform.OS == 'android' ? 25 : 0}
              >
                <Button
                  borderRadius={16}
                  bgColor={palette.white}
                  borderColor={palette.white}
                  textStyle={styles.buttonText}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                >
                  {t('login')}
                </Button>
                <Button
                  borderRadius={16}
                  bgColor={palette.black}
                  borderColor={palette.white}
                  textStyle={styles.buttonText2}
                  onPress={() => {
                    navigation.navigate('RegisterForm');
                  }}
                >
                  {t('register')}
                </Button>
              </VStack>
            </VStack>
          </Layout>
        </ImageBackground>
      </Box>
    </Layout>
  );
};
export default WelcomeScreen;
