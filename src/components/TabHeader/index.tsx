import React, { ReactNode } from 'react';
import {
  HStack,
  Progress,
  ProgressFilledTrack,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { Platform, TextStyle, ViewStyle } from 'react-native';

// components
import Text from '../Text/Text';

// styles
import { palette } from '../../theme/palette';

// assets
import { styles } from './styles';
import { Pressable } from '@gluestack-ui/themed';
import ArrowLeftIcon from '../../assets/icons/ArrowLeft/ArrowLeftIcon';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import LeftArrowIcon from '../../assets/icons/ArrowLeft/LeftArrowIcon';
import CancelIcon from '../../assets/icons/CancelIcon/CancelIcon';
import SettingsFocusedicon from '../../assets/icons/TabBar/SettingsFocusedicon';
import VideoCancelIcon from '../../assets/icons/CancelIcon/VideoCancelIcon';

interface HeaderProps {
  variant?:
    | 'default'
    | 'withBackIcon'
    | 'withSettingsIcon'
    | 'leftArrow'
    | 'withBackIconVideo'
    | null;
  title?: string;
  onPress?: () => void;
  onPressSetting?: () => void;
  children?: any;
  headerStyle?: ViewStyle | ViewStyle[];
  titleColor?: string;
  gradient?: string[];
  headerScreenTitle?: string;
  cancelIcon?: boolean;
  progressBar?: boolean;
  progressValue?: number;
  textStyle?: TextStyle | TextStyle[];
}

const TabHeader = ({
  variant,
  onPress,
  onPressSetting,
  children,
  headerStyle,
  gradient,
  headerScreenTitle,
  title,
  titleColor,
  cancelIcon,
  progressBar = false,
  progressValue,
  textStyle,
}: HeaderProps) => {
  const renderHeaderContent = () => {
    switch (variant) {
      case 'withBackIcon':
        return (
          <Pressable
            onPress={onPress}
            style={styles.withBackIcon}
            hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
          >
            {cancelIcon ? <CancelIcon /> : <LeftArrowIcon />}
          </Pressable>
        );
      case 'withBackIconVideo':
        return (
          <Pressable
            onPress={onPress}
            style={styles.withBackIcon}
            hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
          >
            <VideoCancelIcon />
          </Pressable>
        );

      case 'withSettingsIcon':
        return (
          <>
            <Pressable
              onPress={onPress}
              style={styles.withBackIcon}
              hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
            >
              <MaskedView
                style={{
                  width: 19,
                  height: 15,
                }}
                maskElement={<ArrowLeftIcon />}
              >
                <View
                  style={{ flex: 1, height: '100%', backgroundColor: 'grey' }}
                />
                <LinearGradient
                  colors={gradient ? gradient : palette.arrowGradient}
                  style={{ width: '100%', height: '100%' }}
                />
              </MaskedView>
            </Pressable>
            <Pressable
              onPress={onPressSetting}
              style={styles.withSettingsIcon}
              hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
            >
              <SettingsFocusedicon />
            </Pressable>
          </>
        );
      case 'leftArrow':
        return (
          <Pressable
            onPress={onPress}
            style={styles.withBackIcon}
            hitSlop={{ bottom: 20, left: 20, top: 20, right: 20 }}
          >
            <MaskedView
              style={{
                width: 19,
                height: 15,
              }}
              maskElement={<ArrowLeftIcon />}
            >
              <View
                style={{ flex: 1, height: '100%', backgroundColor: 'grey' }}
              />
              <LinearGradient
                colors={gradient ? gradient : palette.arrowGradient}
                style={{ width: '100%', height: '100%' }}
              />
            </MaskedView>
          </Pressable>
        );

      default:
        return <View style={styles.withBackIcon}></View>;
    }
  };

  return (
    <VStack
      style={[headerStyle]}
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
        {renderHeaderContent()}
        {headerScreenTitle && (
          <VStack alignItems="center" w={'100%'} gap={5}>
            <Text
              color={palette.lessonNumber}
              style={textStyle}
              preset="mRegular"
            >
              {headerScreenTitle}
            </Text>

            {title && (
              <Text
                style={[styles.lessonName]}
                color={titleColor ? titleColor : palette.lessonName}
                text={title}
              />
            )}
          </VStack>
        )}
        {progressBar && (
          <View width={'100%'} alignItems="center">
            <Progress value={progressValue} w="67%" h="$1.5">
              <ProgressFilledTrack h="$1" bg={palette.lightDark2} />
            </Progress>
          </View>
        )}
      </HStack>

      {children}
    </VStack>
  );
};

export default TabHeader;
