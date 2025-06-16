import { Box, KeyboardAvoidingView, VStack } from '@gluestack-ui/themed';
import React, { useCallback, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppStackScreenProps } from '../../navigator/appNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// components

import TextField from '../../components/TextField/TextField';

//styles
import { styles } from './styles';

// theme
import { palette } from '../../theme/palette';
import { useNavigation } from '@react-navigation/native';
import TabHeader from '../../components/TabHeader';
import { Layout } from '../../navigator/Layout';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import DeleteIcon from '../../assets/icons/Delete/DeleteIcon';
import { validationSchema } from './schema';
import { useUser } from '../../store/user';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useMainQuran } from '../../store/mainQuran';
import { useCourses } from '../../store/courses';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { t } = useTranslation();

  const { bottom } = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const flatListRef = useRef<FlatList | null | any>(null);
  const { loginUser, resendValidation, isLoading, setAuthorize } = useUser();
  const { getSurahs, getJuzs, isLoading: textLoad } = useMainQuran();
  const { getCourses } = useCourses();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });
  const {
    formState: { errors },
    trigger,
    handleSubmit,
  } = methods;

  const onPressDevice = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const login = async (values: FieldValues) => {
    console.log('values', values);
    const { passwordLogin, phone } = values;
    const formattedNumber = phone.replace(/\D/g, '');
    try {
      const res = await loginUser({
        phone: formattedNumber,
        password: passwordLogin,
      });

      await getCourses(1);
      await getSurahs();
      await getJuzs();
      setAuthorize(true);

      // if (res.email_verified_at) {
      //   await getCourses(1);
      //   await getSurahs();
      //   await getJuzs();
      //   setAuthorize(true);
      // } else {
      //   await resendValidation(res.email);
      //   navigation.navigate('CodeConfermation');
      // }
    } catch (error: any) {
      console.log('Login error', error);
      Toast.show({
        type: 'info',
        position: 'top',
        text1: error,
      });
    }
  };

  const screens = [
    {
      id: '1',
      type: 'phone',
      text: t('phoneField'),
      error: errors.phone,
    },
    {
      id: '2',
      type: 'passwordLogin',
      text: t('passwordLogin'),
      error: errors.passwordLogin,
    },
  ];

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: any }) => (
      <Box flex={1} width={width}>
        <Layout padding>
          <TabHeader
            variant={'leftArrow'}
            onPress={() => {
              if (index === 0) {
                navigation.goBack();
              } else {
                flatListRef.current.scrollToIndex({
                  index: index - 1,
                  animated: true,
                });
              }
            }}
            gradient={palette.arrowGradient2}
          />

          <VStack
            flex={1}
            alignItems="center"
            justifyContent="space-between"
            mb={bottom}
          >
            <VStack width={'100%'}>
              <Text
                color={palette.textcolor1}
                preset="heading4"
                style={styles.textHeader}
              >
                {item.text}
              </Text>
              <VStack h={56} mt={20}>
                {index === 0 ? (
                  <TextField
                    name={'phone'}
                    uniqNameValidation
                    inputType="mask"
                    rightIcon={<DeleteIcon />}
                    label={`+7 `}
                    onFocusHandle={() => setIsFocused(true)}
                    onBlurHandle={() => setIsFocused(false)}
                    style={styles.textField}
                    error={errors.phone}
                  />
                ) : (
                  <TextField
                    name={item.type}
                    secureTextEntry={true}
                    uniqNameValidation
                    rightIcon={<DeleteIcon />}
                    onFocusHandle={() => setIsFocused(true)}
                    onBlurHandle={() => setIsFocused(false)}
                    style={styles.textField}
                    error={item.error}
                  />
                )}
              </VStack>
            </VStack>
            <Button
              buttonStyle={{
                marginBottom: Platform.OS === 'android' ? 45 : undefined,
              }}
              disabled={isFocused || isLoading || textLoad}
              borderRadius={16}
              textStyle={styles.buttonText}
              onPress={
                item.type === 'passwordLogin'
                  ? handleSubmit(login)
                  : async () => {
                      const isValid = await trigger(item.type);
                      if (isValid && index < screens.length - 1) {
                        flatListRef.current.scrollToIndex({
                          index: index + 1,
                          animated: true,
                        });
                      }
                    }
              }
            >
              {t('nextButton')}
            </Button>
          </VStack>
        </Layout>
      </Box>
    ),
    [errors, handleSubmit, isFocused, navigation, trigger, login]
  );

  return (
    <Layout top>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={onPressDevice}>
          <VStack flex={1}>
            <FormProvider {...methods}>
              <FlatList
                ref={flatListRef}
                data={screens}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={0}
                getItemLayout={(data, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
              />
            </FormProvider>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default LoginScreen;
