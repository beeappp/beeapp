import { CloseCircleIcon, HStack, Icon, VStack } from '@gluestack-ui/themed';
import { Dimensions } from 'react-native';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { palette } from '../../theme/palette';
import Text from '../Text/Text';
import { FC } from 'react';

type CustomToastConfigParams = {
  text1?: string;
  text2?: string;
};

const { width } = Dimensions.get('window');

const TomatoToast: React.FC<
  ToastConfigParams<CustomToastConfigParams>
> = props => (
  <HStack
    mt={30}
    w={width - 32}
    p={16}
    alignItems="center"
    gap={12}
    borderColor={palette.red}
    borderWidth={0.5}
    bgColor={palette.brownGrey}
    borderRadius={16}
  >
    <Icon as={CloseCircleIcon} color={palette.red} m="$2" w="$4" h="$4" />
    <VStack w={width - 140} gap={4}>
      <Text text={props.text1} />
      {props.text2 && <Text color={palette.white}>{props.text2}</Text>}
    </VStack>
  </HStack>
);

const toastConfig: ToastConfig = {
  success: props => null,
  tomatoToast: TomatoToast,
};

export default toastConfig;
