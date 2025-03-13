import {
  Box,
  ButtonText,
  FlatList,
  Text,
  TrashIcon,
  View,
  VStack,
} from '@gluestack-ui/themed';
import React, { useCallback, useRef, useState } from 'react';
import { Layout } from '../../navigator/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModalProvider,
  BottomSheetModal as BSModal,
} from '@gorhom/bottom-sheet';
import { Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import PaymnetNoticeIcon from '../../assets/icons/Settings/PaymentNoticeIcon';
import NotificationIcon from '../../assets/icons/Settings/NotificationIcon';
import BeeAppIcon from '../../assets/icons/Settings/BeeAppIcon';
import Coloricon from '../../assets/icons/Settings/ColorIcon';

import InfoAdditionalIcon from '../../assets/icons/Settings/InfoAdditionalIcon';
import SupportIcon from '../../assets/icons/Settings/SupportIcon';
import RightArrowIcon from '../../assets/icons/Settings/RightArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import LogOutIcon from '../../assets/icons/Settings/LogOutIcon';
import { useUser } from '../../store/user';

import { AppStackScreenProps } from '../../navigator/appNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetModal from '../../components/BottomSheetModal';
import Button from '../../components/Button/Button';
import BottomModal from '../../components/LogOutModal';
import LogOutModal from '../../components/LogOutModal';
import { Portal } from '@gorhom/portal';
import { useSetAtom } from 'jotai';
import { CoursesItemsAtom } from '../../tools/atoms/common';
import SelectModal from '../../components/SelectModal';
// import DeleteModal from '../../components/DeleteModal';

type SettingsOption = {
  id: string;
  icon: JSX.Element;
  label: string;
  navigation?: string;
  navigationLink?: string;
};

const SettingsScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { logout, deleteUser, currentUser } = useUser();
  const bottomSheetModalRef = useRef<BSModal>(null);
  const setCourse = useSetAtom(CoursesItemsAtom);
  const [currentModal, setCurrentModal] = useState<
    'delete' | 'exit' | 'reset' | null
  >(null);

  const settingsOptions: SettingsOption[] = [
    {
      id: '1',
      icon: <PaymnetNoticeIcon />,
      label: t('notification'),
      // navigation: 'PaymentNotice',
    },
    {
      id: '2',
      icon: <NotificationIcon />,
      label: t('enable_notice'),
      navigation: 'NotificationSetting',
    },
    // {
    //   id: '3',
    //   icon: <Coloricon />,
    //   label: t('setting_color'),
    //   navigation: 'ColorChange',
    // },
    {
      id: '4',
      icon: <SupportIcon />,
      label: t('setting_help'),
      navigationLink: 'https://t.me/K20Bee',
    },
    {
      id: '5',
      icon: <InfoAdditionalIcon />,
      label: t('setting_about'),
      navigation: 'About',
    },
    {
      id: '6',
      icon: <Coloricon />,
      label: t('resetProgressTitle'),
    },
    {
      id: '7',
      icon: (
        <Box
          width={30}
          height={30}
          justifyContent="center"
          alignItems="center"
          bgColor={'#434343'}
          borderRadius={10}
        >
          <TrashIcon color={'$white'} size={'sm'} />
        </Box>
      ),
      label: t('delete'),
      // navigation: 'About',
    },
    {
      id: '8',
      icon: <LogOutIcon />,
      label: t('log_out'),
      // navigation: 'About',
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

  const deleteAccount = async () => {
    if (currentUser) {
      try {
        await deleteUser({ userId: currentUser.id });
        logout();
        close();
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const exit = useCallback(() => {
    logout();
    close();
    // navigation.navigate('Welcome');
  }, [logout]);

  const onChange = (lang: string) => {
    i18n.changeLanguage(lang);
    // languageDetectorPlugin.cacheUserLanguage(lang);
  };
  const renderItem: any = ({ item }: { item: SettingsOption }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (item.id === '6') {
          setCurrentModal('reset');
          open();
        } else if (item.id === '7') {
          setCurrentModal('delete');
          open();
        } else if (item.id === '8') {
          setCurrentModal('exit');
          open();
        } else {
          item.navigationLink
            ? Linking.openURL(item.navigationLink)
            : item.navigation == 'PaymentNotice'
            ? navigation.navigate('PaymentNotice', { fromSetting: true })
            : item.navigation
            ? navigation.navigate(item.navigation)
            : undefined;
        }
      }}
    >
      <View style={styles.iconWrapper}>{item.icon}</View>
      <Text style={styles.label}>{item.label}</Text>
      <RightArrowIcon />
    </TouchableOpacity>
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <VStack style={styles.container} pt={top}>
        <VStack style={styles.header}>
          <Text style={styles.headerText}>{t('parameters')}</Text>
        </VStack>
        <View style={styles.settingsContainer}>
          <VStack flex={1} pb={bottom + 75} justifyContent="space-between">
            <VStack flex={1} paddingHorizontal={10} alignContent="center">
              <FlatList
                data={settingsOptions}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingTop: 25 }}
              />
            </VStack>
            <View
              width={'100%'}
              alignItems="center"
              marginBottom={Platform.OS == 'android' ? 40 : 20}
            >
              <BeeAppIcon />
            </View>
          </VStack>
        </View>
      </VStack>
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal modalRef={bottomSheetModalRef} modalHeight={325}>
            {currentModal === 'exit' ? (
              <SelectModal
                title={t('log_out')}
                subtitle={t('exitText')}
                buttonBottomText={t('addStay')}
                buttonTopText={t('exitButton')}
                onPressTop={exit}
                onPressBottom={close}
              />
            ) : currentModal === 'delete' ? (
              <SelectModal
                title={t('delete')}
                subtitle={t('deleteAccountText')}
                buttonBottomText={t('goBack')}
                buttonTopText={t('deleteAccountButton')}
                onPressTop={deleteAccount}
                onPressBottom={close}
              />
            ) : (
              <SelectModal
                title={t('resetProgressTitle')}
                subtitle={t('resetProgressText')}
                buttonBottomText={t('goBack')}
                buttonTopText={t('resetProgressButton')}
                onPressTop={() => {
                  setCourse({});
                  close();
                }}
                onPressBottom={close}
              />
            )}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </GestureHandlerRootView>
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
    marginBottom: 20,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: palette.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconWrapper: {
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontFamily: typography.medium,
    color: palette.lightDark,
  },
  separator: {
    height: 0.5,
    borderRadius: 1,
    backgroundColor: palette.divider,
    marginHorizontal: 16,
  },
});

export default SettingsScreen;
