import { KeyboardAvoidingView, VStack } from '@gluestack-ui/themed';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppStackScreenProps } from '../../navigator/appNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';

//styles
import { styles } from './styles';

// theme
import { palette } from '../../theme/palette';
import { useNavigation } from '@react-navigation/native';
import TabHeader from '../../components/TabHeader';
import { Layout } from '../../navigator/Layout';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import { load } from '../../utils/storage';
import CodeConfirmationField from '../../components/CodeConfirmationField';
import { useUser } from '../../store/user';
import { useCourses } from '../../store/courses';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useMainQuran } from '../../store/mainQuran';

const CodeConfermationScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const { t } = useTranslation();
  const nameValidationSchema = Yup.object({
    code: Yup.string().min(6, `6 символ болуы керек`).required(),
  });

  const { bottom } = useSafeAreaInsets();
  const { resendValidation, verifyCode, currentUser, isLoading, setAuthorize } =
    useUser();
  const email = currentUser?.email;
  const { getCourses } = useCourses();
  const { getSurahs, getJuzs, isLoading: textLoad } = useMainQuran();

  const methods = useForm({
    resolver: yupResolver(nameValidationSchema),
    mode: 'onSubmit',
  });
  const {
    getValues,
    watch,
    setValue,
    formState: { errors },
    resetField,
    handleSubmit,
  } = methods;

  const onPressDevice = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const postCodeVerify = useCallback(
    async (values: FieldValues) => {
      const { code } = values;

      try {
        await verifyCode({
          email: email,
          activation_code: code,
        });
        await getCourses(1);
        await getSurahs();
        await getJuzs();
        setAuthorize(true);
      } catch (error: any) {
        console.log('Code verify error', error);
        Toast.show({
          type: 'info',
          position: 'top',
          text1: error,
        });
      }
    },
    [navigation, email, currentUser, currentUser?.email_verified_at]
  );

  const postResendCode = useCallback(async () => {
    try {
      if (email) await resendValidation(email);
    } catch (error: any) {
      console.log('Resend code error', error);
    }
  }, [email, resendValidation]);

  return (
    <Layout top padding>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={onPressDevice}>
          <VStack flex={1}>
            <FormProvider {...methods}>
              <Layout>
                <TabHeader
                  variant={'leftArrow'}
                  onPress={() => navigation.goBack()}
                  gradient={palette.arrowGradient2}
                />

                <VStack flex={1} alignItems="center" mb={bottom}>
                  <VStack gap={10} alignItems="center">
                    <Text style={styles.headerText} color={palette.blue}>
                      {t('codeField')}
                    </Text>

                    <CodeConfirmationField
                      name="code"
                      error={errors.code?.message}
                    />
                  </VStack>
                </VStack>
                <VStack alignItems="center" gap={20}>
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={postResendCode}
                    style={{ opacity: isLoading ? 0.2 : 1 }}
                  >
                    <Text style={styles.resendText} color={palette.blue}>
                      {t('codeRepeat')}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    disabled={isLoading || textLoad}
                    borderRadius={16}
                    buttonStyle={{
                      marginBottom: Platform.OS === 'android' ? 45 : 30,
                    }}
                    textStyle={styles.buttonText}
                    onPress={handleSubmit(postCodeVerify)}
                  >
                    {t('sendCode')}
                  </Button>
                </VStack>
              </Layout>
            </FormProvider>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default CodeConfermationScreen;
