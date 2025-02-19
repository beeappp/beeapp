import { Box, HStack, ScrollView, View, VStack } from '@gluestack-ui/themed';
import React, { FC, useRef } from 'react';
import { Layout } from '../../navigator/Layout';
import { StyleSheet } from 'react-native';
import PaymentNoticeIcon from '../../assets/icons/PaymentNotice/PaymentNoticeIcon';
import LockIcon from '../../assets/icons/PaymentNotice/LockIcon';
import TimeIcon from '../../assets/icons/PaymentNotice/TimeIcon';
import MessageIcon from '../../assets/icons/PaymentNotice/MessageIcon';
import DocumentIcon from '../../assets/icons/PaymentNotice/DocumentIcon';
import { palette } from '../../theme/palette';
import Text from '../../components/Text/Text';
import { typography } from '../../theme/typography';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import {
  AppStackScreenProps,
  MainStackParamList,
} from '../../navigator/appNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TabHeader from '../../components/TabHeader';
import { Screen } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModalProvider,
  BottomSheetModal as BSModal,
} from '@gorhom/bottom-sheet';
import BottomSheetModal from '../../components/BottomSheetModal';
import { useTranslation } from 'react-i18next';

const PaymentNoticeScreen: FC<
  NativeStackScreenProps<MainStackParamList, 'PaymentNotice'>
> = ({ route }) => {
  const fromSetting = route.params?.fromSetting;
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const bottomSheetModalRef = useRef<BSModal>(null);
  const { t } = useTranslation();

  const componentsWrapper = [
    {
      icon: <LockIcon />,
      text: t('paymentRound'),
    },
    {
      icon: <TimeIcon />,
      text: t('paymentOffline'),
    },
    {
      icon: <MessageIcon />,
      text: t('paymentNotice'),
    },
    {
      icon: <DocumentIcon />,
      text: t('paymentPrivilage'),
    },
  ];

  const open = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    }
  };
  const close = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Layout top bottom padding bg>
          <ScrollView showsVerticalScrollIndicator={false}>
            {fromSetting && (
              <TabHeader
                variant={'leftArrow'}
                gradient={palette.arrowGradient2}
                onPress={() => {
                  navigation.navigate('TabNavigator', { screen: 'Settings' });
                }}
                headerStyle={[
                  {
                    position: 'absolute',
                    zIndex: 1,
                  },
                ]}
              />
            )}
            <VStack style={styles.container}>
              <PaymentNoticeIcon />

              <Text color={palette.lightDark} style={styles.headerText}>
                {t('paymentHeader')}
              </Text>

              <VStack w={'100%'} gap={22}>
                {componentsWrapper.map((section, index) => {
                  const { icon, text } = section;
                  return (
                    <HStack key={index} w={'100%'} alignItems="center" gap={20}>
                      {icon}
                      <Text color="#9A9A9A" style={styles.iconText}>
                        {text}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </VStack>
          </ScrollView>
          <VStack flex={1} alignItems="center">
            <Button textStyle={styles.buttonText} onPress={open}>
              3,290 {t('paymentButton')}
            </Button>
            <Button
              bgColor={palette.white}
              borderColor={palette.white}
              activeBgColor={palette.activeButton1}
              activeBorderColor={palette.activeButton1}
              textStyle={styles.buttonText}
              colors={palette.paleIcon}
              onPress={() => {
                navigation.navigate('TabNavigator');
              }}
            >
              {t('noPayment')}
            </Button>
          </VStack>
        </Layout>
        <BottomSheetModal modalRef={bottomSheetModalRef} modalHeight={308}>
          <View flex={1} alignItems="center" paddingHorizontal={20}>
            <VStack justifyContent="flex-start" mt={10} w={'100%'}>
              <Text
                color={palette.lightDark}
                style={{
                  fontFamily: typography.medium,
                  fontSize: 24,
                }}
              >
                {t('paymentModal')}
              </Text>
            </VStack>
            <VStack width={'100%'} gap={7} mt={30}>
              <Button
                onPress={() => {
                  navigation.navigate('TabNavigator');
                }}
                colors={palette.lightDark2}
                bgColor={palette.white}
                textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
              >
                {t('paymentExit')}
              </Button>
              <Button
                onPress={() => {
                  close();
                }}
                textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
              >
                {t('paymentStay')}
              </Button>
            </VStack>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    lineHeight: 26,
    width: '100%',
    marginVertical: 40,
    fontFamily: typography.medium,
  },
  smallerContainer: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    width: '80%',
    fontFamily: typography.light,
    fontSize: 16,
    textAlign: 'left',
  },
  buttonText: {
    fontFamily: typography.medium,
    fontSize: 19,
    textAlign: 'center',
  },
});

export default PaymentNoticeScreen;
