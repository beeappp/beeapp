import React, { useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import {
  Box,
  Input,
  InputField,
  InputSlot,
  Pressable,
  View,
} from '@gluestack-ui/themed';

// style
import styles, { inputWrapper } from './styles';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
// import Eye from '../../assets/icons/Eye';
// import EyeClosed from '../../assets/icons/EyeClosed';
import Text from '../Text/Text';
import MaskInput from 'react-native-mask-input';
// import MaskInput from 'react-native-mask-input';

export interface TextFieldProps extends TextInputProps {
  style?: ViewStyle | ViewStyle[];
  backgroundStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  textInputStyle?: TextStyle | TextStyle[];
  name: string;
  defaultValue?: string | any;
  error?: FieldError | undefined;
  mask?: string | any;
  label?: string;
  hint?: string;
  placeholder?: string;
  prefix?: string;
  autoTransliterate?: boolean;
  rightComponent?: JSX.Element;
  inputLabelStyle?: TextStyle | TextStyle[];
  search?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconPress?: () => void;
  textCenter?: boolean;
  greenBorder?: boolean;
  eye?: boolean;
  isReadOnly?: boolean;
  uniqNameValidation?: boolean;
  inputType?: 'mask';
  customChange?: (e: string) => void;
  withoutError?: boolean;
  onFocusHandle: () => void;
  onBlurHandle: () => void;
}

const PHONE_MASK = [
  '+',
  '7',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
];

export default function TextField(props: TextFieldProps) {
  const {
    style: styleOverride,
    backgroundStyle,
    secureTextEntry,
    name,
    defaultValue = '',
    error,
    label,
    prefix,
    search,
    leftIcon,
    rightIcon,
    keyboardType,
    textCenter = false,
    rightIconPress,
    eye = false,
    uniqNameValidation = false,
    isReadOnly = false,
    withoutError = false,
    inputType,
    mask,
    onFocusHandle,
    onBlurHandle,
    ...rest
  } = props;

  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  const emailValidation = (formatted: string) => {
    if (formatted[formatted.length - 1] == '@') {
      onBlurHandle && onBlurHandle();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const clearInput = () => {
          onChange('');
        };

        switch (inputType) {
          case 'mask': {
            return (
              <>
                <View
                  style={[
                    backgroundStyle,
                    styleOverride,
                    inputWrapper({
                      error: error,
                      search: search,
                    }),
                  ]}
                >
                  <Input
                    variant="outline"
                    borderWidth={1}
                    h={56}
                    w={'100%'}
                    bg={palette.white}
                    borderColor={isFocused ? palette.brownGrey : palette.white}
                    $focus-borderColor={palette.brownGrey}
                    $invalid-bgColor={palette.white}
                    $invalid-borderColor={'#F63838'}
                    borderRadius={12}
                    isDisabled={false}
                    isInvalid={error != undefined}
                    isReadOnly={isReadOnly}
                  >
                    <MaskInput
                      readOnly={isReadOnly}
                      style={styles.maskInput}
                      value={value}
                      placeholder={label}
                      keyboardType="numeric"
                      placeholderTextColor={palette.grey}
                      onChangeText={(formatted: string) => {
                        onChange(formatted);
                        if (formatted.length === 16) {
                          onBlurHandle && onBlurHandle();
                        } else if (formatted.length <= 16) {
                          onFocusHandle && onFocusHandle();
                        }
                      }}
                      mask={PHONE_MASK}
                      onFocus={() => {
                        setIsFocused(true);
                        onFocusHandle();
                      }}
                      onBlur={() => {
                        setIsFocused(false);
                        onBlurHandle();
                      }}
                    />
                    {rightIcon && (
                      <Pressable
                        position="absolute"
                        alignSelf="center"
                        right={5}
                        pr={10}
                        onPress={clearInput}
                        hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
                      >
                        {rightIcon}
                      </Pressable>
                    )}
                  </Input>
                </View>

                {!withoutError && (
                  <View marginBottom={15} marginTop={5} alignSelf="flex-end">
                    {error && (
                      <Text preset="sRegular" color={palette.red}>
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              </>
            );
          }
          default: {
            return (
              <View marginBottom={10}>
                <View
                  style={[
                    backgroundStyle,
                    styleOverride,
                    inputWrapper({
                      error: error,
                      search: search,
                    }),
                  ]}
                >
                  <Input
                    variant="outline"
                    borderWidth={1}
                    h={56}
                    bg={palette.white}
                    borderColor={palette.white}
                    $focus-borderColor={palette.brownGrey}
                    $invalid-bgColor={palette.white}
                    $invalid-borderColor={'#F63838'}
                    w={'100%'}
                    borderRadius={12}
                    isDisabled={false}
                    isInvalid={error != undefined}
                    isReadOnly={false}
                  >
                    <InputField
                      secureTextEntry={secureTextEntry}
                      paddingLeft={textCenter ? 0 : 24}
                      placeholderTextColor={palette.greyScale4}
                      color={
                        name == 'password' || name == 'password_confirmation'
                          ? palette.codeResend
                          : palette.greyScale
                      }
                      placeholder={label}
                      textContentType={
                        name == 'password' ? 'oneTimeCode' : undefined
                      }
                      fontSize={16}
                      fontFamily={typography.regular}
                      keyboardType={keyboardType}
                      value={
                        uniqNameValidation ? value.replace(/[ ]/gi, '_') : value
                      }
                      textAlign={textCenter ? 'center' : 'left'}
                      onChangeText={(formatted: string) => {
                        rest.customChange && rest.customChange(formatted);
                        if (!value && prefix) {
                          onChange(`${prefix} ${formatted}`);
                        } else {
                          onChange(formatted);
                          name == 'email' && emailValidation(formatted);
                          if (name == 'passwordLogin') {
                            if (formatted.length >= 10) {
                              onBlurHandle && onBlurHandle();
                            } else if (formatted.length < 10) {
                              onFocusHandle && onFocusHandle();
                            }
                          }
                          if (
                            (name === 'name' || name === 'surname') &&
                            formatted
                          ) {
                            if (formatted.length >= 3) {
                              onBlurHandle && onBlurHandle();
                            } else if (formatted.length <= 3) {
                              onFocusHandle && onFocusHandle();
                            }
                          }
                        }
                      }}
                      {...rest}
                      onFocus={() => {
                        onFocusHandle();
                      }}
                      onBlur={() => {
                        onBlurHandle();
                      }}
                    />
                  </Input>
                </View>
                {error && (
                  <View marginBottom={15} marginTop={5} alignSelf="flex-end">
                    <Text preset="sRegular" color={palette.red}>
                      {error.message}
                    </Text>
                  </View>
                )}
              </View>
            );
          }
        }
      }}
    />
  );
}
