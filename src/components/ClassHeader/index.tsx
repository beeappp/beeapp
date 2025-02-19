import React from 'react';
import { HStack, Icon, View, VStack } from '@gluestack-ui/themed';
import { Platform, ViewStyle } from 'react-native';

// components
import Text from '../Text/Text';

// styles
import { palette } from '../../theme/palette';

// assets
import { styles } from './styles';
import { Pressable } from '@gluestack-ui/themed';
import ClassReceiptIcon from '../../assets/icons/LevelScreen/ClassReceiptIcon';

interface HeaderProps {
  onPress?: () => void;
  // id: number;
  classTitle?: string;
}

const ClassHeader = ({ onPress, classTitle }: HeaderProps) => {
  return (
    <VStack
      style={{ position: 'absolute', zIndex: 1 }}
      marginTop={Platform.OS == 'android' ? 20 : undefined}
      paddingTop={16}
      paddingBottom={16}
      h={60}
    >
      <HStack
        backgroundColor="transparent"
        width={'100%'}
        alignItems="center"
        justifyContent="center"
      >
        <Pressable
          onPress={onPress}
          hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
          w={'100%'}
          h={'100%'}
        >
          <HStack style={styles.tabHeader}>
            <VStack gap={2} w={'80%'} pl={20}>
              <Text color={'#D3D3D3'} style={styles.levelNText}>
                {`${1}`}-ШІ БӨЛІМ
              </Text>
              <Text color={palette.lightDark} style={styles.levelName}>
                {classTitle}
              </Text>
            </VStack>

            <HStack>
              <View w={2} bgColor={palette.greyScale10} />
              <Pressable
                onPress={onPress}
                style={styles.classIcon}
                hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
                padding={22}
              >
                <Icon as={ClassReceiptIcon} />
              </Pressable>
            </HStack>
          </HStack>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default ClassHeader;
