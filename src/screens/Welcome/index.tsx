import React, { useState } from 'react';
import {
  VStack,
  Box,
  View,
  ModalBackdrop,
  ModalContent,
  Modal,
} from '@gluestack-ui/themed';
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

import FastImage from 'react-native-fast-image';

const WelcomeScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

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
                    // navigation.navigate('RegisterForm');
                    setIsVisible(true);
                  }}
                >
                  {t('register')}
                </Button>
              </VStack>
            </VStack>
          </Layout>
        </ImageBackground>
      </Box>
      <Modal
        isOpen={isVisible}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <ModalBackdrop />
        <ModalContent borderRadius={40}>
          <Box
            w={'100%'}
            bgColor="white"
            justifyContent="center"
            alignItems="center"
            padding={30}
            gap={20}
          >
            <View w={60} h={60} justifyContent="center" alignItems="center">
              <FastImage
                source={require('../../assets/img/exampleLevel/Lock.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <VStack style={styles.headerContainer}>
              <Text style={styles.headerText}>
                BeeApp-қа сатылым әзірге жабық
              </Text>
              <Text style={styles.text}>
                {
                  'Келесі сатылым ашылуын әлеуметтік желілерде парақшамызды бақылаңыз.'
                }
              </Text>
            </VStack>
            <Button
              textStyle={{ fontSize: 20 }}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              Артқа қайту
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Layout>
  );
};
export default WelcomeScreen;
