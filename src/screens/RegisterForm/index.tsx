import {
  Box,
  HStack,
  KeyboardAvoidingView,
  View,
  VStack,
} from '@gluestack-ui/themed';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import * as Yup from 'yup';

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
import { useUser } from '../../store/user';
import Toast from 'react-native-toast-message';
import DotIcon from '../../assets/icons/Dot/DotIcon';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const RegisterFormScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { t } = useTranslation();

  const { bottom } = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const flatListRef = useRef<FlatList | null | any>(null);
  const { registerUser, isLoading, setAuthorize } = useUser();

  const validationSchema = Yup.object({
    phone: Yup.string().required().min(16, t('phoneShema')),
    name: Yup.string().required().min(1),
    surname: Yup.string().required().min(1),
    email: Yup.string().required().email(t('errorFormat')),
    password: Yup.string()
      .required()
      .min(10, t('minSchema'))
      .matches(/[a-z]/, t('lowerLetterSchema'))
      .matches(/[A-Z]/, t('upperLetterSchema'))
      .matches(/[0-9]/, t('numberSchema'))
      .matches(/[@$!%*?&#]/, t('symbolSchema')),
    password_confirmation: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], t('wrongPassword')),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });
  const {
    getValues,
    watch,
    control,
    setValue,
    formState: { errors },
    resetField,
    trigger,
    handleSubmit,
  } = methods;

  const onPressDevice = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const sendForCode = async (values: FieldValues) => {
    const { email, name, password, password_confirmation, phone, surname } =
      values;
    const formattedNumber = phone.replace(/\D/g, '');
    try {
      await registerUser({
        phone: formattedNumber,
        password: password,
        password_confirmation: password_confirmation,
        name: name,
        last_name: surname,
        email: email,
        approve_confidential: true,
      });
      setAuthorize(true);
    } catch (error: any) {
      console.log('Register error', error);
      Toast.show({
        type: 'info',
        position: 'top',
        text1: error,
      });
    }
  };

  const passwordText = [
    { text: t('minSchema') },
    { text: t('lowerLetterSchema') },
    { text: t('upperLetterSchema') },
    { text: t('numberSchema') },
    { text: t('symbolSchema') },
  ];

  const screens = [
    {
      id: '1',
      type: 'phone',
      text: t('phoneField'),
      error: errors.phone,
    },
    {
      id: '2',
      type: 'name',
      text: t('nameField'),
      error: errors.name,
    },
    {
      id: '3',
      type: 'surname',
      text: t('surnameField'),
      error: errors.surname,
    },
    {
      id: '4',
      type: 'email',
      text: t('emailField'),
      error: errors.email,
    },
    {
      id: '5',
      type: 'password',
      text: t('passwordField'),
      error: errors.password,
    },
    {
      id: '6',
      type: 'password_confirmation',
      text: t('againPassword'),
      error: errors.password_confirmation,
    },
    // { id: '7', type: 'approve_confidential' },
  ];

  const [validationStatus, setValidationStatus] = useState({
    minLength: false,
    lowerCase: false,
    upperCase: false,
    number: false,
    symbol: false,
  });

  const validationArray = [
    validationStatus.minLength,
    validationStatus.lowerCase,
    validationStatus.upperCase,
    validationStatus.number,
    validationStatus.symbol,
  ];

  const password = watch('password');

  useEffect(() => {
    const updatedValidationStatus = {
      minLength: password ? password.length >= 10 : false,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[@$!%*?&#]/.test(password),
    };
    setValidationStatus(updatedValidationStatus);
    const allValid = Object.values(updatedValidationStatus).every(
      status => status
    );

    if (allValid) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [password]);

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
                    secureTextEntry={
                      item.type == 'password' ||
                      item.type == 'password_confirmation'
                    }
                    placeholder={
                      item.type == 'email' ? 'abc@beeapp.kz' : undefined
                    }
                    uniqNameValidation
                    rightIcon={<DeleteIcon />}
                    onFocusHandle={() => setIsFocused(true)}
                    onBlurHandle={() => setIsFocused(false)}
                    style={styles.textField}
                    error={item.error}
                  />
                )}
                {item.type == 'password' && (
                  <VStack gap={12} mt={20}>
                    {passwordText.map((item, index) => {
                      return (
                        <HStack
                          key={index}
                          style={styles.textContainer}
                          opacity={validationArray[index] ? '$100' : '$50'}
                        >
                          <DotIcon />
                          <Text style={styles.validationText}>{item.text}</Text>
                        </HStack>
                      );
                    })}
                  </VStack>
                )}
              </VStack>
            </VStack>
            <Button
              buttonStyle={{
                marginBottom: Platform.OS === 'android' ? 45 : undefined,
              }}
              disabled={isFocused || isLoading}
              borderRadius={16}
              textStyle={styles.buttonText}
              onPress={
                item.type === 'password_confirmation'
                  ? handleSubmit(sendForCode)
                  : async () => {
                      const isValid = await trigger(item.type);
                      if (isValid) {
                        if (index < screens.length - 1) {
                          flatListRef.current.scrollToIndex({
                            index: index + 1,
                            animated: true,
                          });
                        }
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
    [bottom, errors, flatListRef, navigation, sendForCode, isFocused, trigger]
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
                scrollEnabled={false}
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

export default RegisterFormScreen;
