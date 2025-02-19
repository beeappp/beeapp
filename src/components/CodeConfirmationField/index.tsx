import { Text, VStack, View } from '@gluestack-ui/themed';
import React, { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';
import { palette } from '../../theme/palette';
import { TextInput } from 'react-native';

interface CodeConfirmationFieldProps {
  name: string;
  error?: string;
  autofocus?: boolean;
}

const CELL_COUNT = 6;

const CodeConfirmationField: FC<CodeConfirmationFieldProps> = ({
  name,
  error,
  autofocus = true,
}) => {
  const { control } = useFormContext();
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <VStack mt={20}>
            <CodeField
              autoFocus={autofocus}
              {...props}
              value={value}
              rootStyle={styles.codeFieldRoot}
              onChangeText={onChange}
              cellCount={CELL_COUNT}
              textContentType="password"
              InputComponent={props => (
                <TextInput {...props} autoCapitalize="none" />
              )}
              renderCell={({ index, symbol, isFocused }) => (
                <View key={index} borderRadius={16} bgColor={palette.white}>
                  <Text
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                    style={styles.cell}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {error && (
              <View mt={8} h={24} alignSelf="flex-end">
                <Text color={palette.red}>{error}</Text>
              </View>
            )}
          </VStack>
        );
      }}
    />
  );
};

export default React.memo(CodeConfirmationField);
