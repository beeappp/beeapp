import {
  Box,
  HStack,
  Modal,
  ModalBackdrop,
  ModalContent,
  Pressable,
  View,
  VStack,
} from '@gluestack-ui/themed';
import React, { FC, useState } from 'react';
import LevelGridIcon from '../../assets/icons/LevelScreen/LevelGridIcon';
import OuterLayerLevelIcon from '../../assets/icons/LevelScreen/OuterLayerLevelIcon';
import LevelGridIcon2 from '../../assets/icons/LevelScreen/LevelGridIcon2';
import BlankGridIcon from '../../assets/icons/LevelScreen/BlankGridIcon';
import BlankSmallIcon from '../../assets/icons/LevelScreen/BlankSmallIcon';
import BlankMediumIcon from '../../assets/icons/LevelScreen/BlankMediumIcon';
import { Platform } from 'react-native';
import { Course } from '../../store/courses/types';
import { useAtom } from 'jotai';
import { chosenGrid } from '../../tools/atoms/common';
import { typography } from '../../theme/typography';
import { palette } from '../../theme/palette';
import { StyleSheet } from 'react-native';
import Text from '../Text/Text';
import Button from '../Button/Button';
import FastImage from 'react-native-fast-image';

interface Props {
  item: Course;
  index: number;
  halfLock: boolean;
  disabled: boolean;
  finished: boolean;
  PickingClass: (index: number) => void;
}

const backgroundLayout = ['first', 'second', 'third', 'fourth'];

const LevelGridItem: FC<Props> = ({
  item,
  index,
  halfLock,
  disabled,
  finished,
  PickingClass,
}) => {
  const { published, color, image_path, id } = item;
  const [choseClass, setChoseClass] = useAtom(chosenGrid);
  const [isVisible, setIsVisible] = useState(false);

  const number = index + 1;
  const renderBackgroundContent = (variant: string) => {
    switch (variant) {
      case 'first':
        return (
          <View
            position="absolute"
            left={choseClass === `${id}` ? 0 : 10}
            bottom={choseClass === `${id}` ? -20 : 5}
          >
            <View right={20} bottom={-10}>
              <BlankSmallIcon />
            </View>
            <BlankMediumIcon />
          </View>
        );
      case 'second':
        return (
          <View position="absolute" right={choseClass === `${id}` ? -45 : -30}>
            <BlankGridIcon />
          </View>
        );
      case 'third':
        return (
          <View position="absolute" left={choseClass === `${id}` ? -45 : -30}>
            <BlankGridIcon />
          </View>
        );
      case 'fourth':
        return (
          <View position="absolute" right={choseClass === `${id}` ? -45 : -30}>
            <BlankGridIcon />
          </View>
        );

      default:
        return <></>;
    }
  };
  return (
    <>
      <View
        ml={number % 2 != 0 ? 55 : 0}
        mr={number % 2 == 0 ? 55 : 0}
        mt={index == 0 && Platform.OS == 'android' ? 10 : undefined}
      >
        <View marginVertical={choseClass === `${id}` ? 12 : -8}>
          <View justifyContent="center" alignItems="center">
            {choseClass === `${id}` && (
              <View position="absolute">
                <OuterLayerLevelIcon color={color || '#8CC14A'} />
              </View>
            )}
            <HStack>
              {published ? (
                <View width={'100%'}>
                  {renderBackgroundContent(backgroundLayout[index % 4])}
                  <Pressable
                    onPress={() => {
                      if (disabled) {
                        setIsVisible(true);
                      } else {
                        setChoseClass(`${id}`);
                        PickingClass(index);
                      }
                    }}
                  >
                    <LevelGridIcon
                      disabled={disabled}
                      color={color || '#8CC14A'}
                      index={number}
                      halfLock={halfLock} //halflock
                      image={image_path}
                      finished={finished}
                    />
                  </Pressable>
                </View>
              ) : (
                <View width={'100%'}>
                  {renderBackgroundContent(backgroundLayout[index % 4])}

                  <LevelGridIcon2
                    index={number}
                    open={false} //open
                    color={color || '#8CC14A'}
                    image={image_path}
                  />
                </View>
              )}
            </HStack>
          </View>
        </View>
      </View>
      <Modal
        isOpen={isVisible}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <ModalBackdrop />
        <ModalContent borderRadius={40}>
          <Box
            w={'100%'}
            bgColor="white"
            justifyContent="center"
            alignItems="center"
            padding={30}
            gap={20}
          >
            <View w={60} h={60} justifyContent="center" alignItems="center">
              <FastImage
                source={require('../../assets/img/exampleLevel/Lock.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <VStack style={styles.headerContainer}>
              <Text style={styles.headerText}>Cіздің Room-ыңыз дайын</Text>
              <Text style={styles.text}>
                {'Room-ға өтіп, Speaking cессияны\n бастасаңыз болады'}
              </Text>
            </VStack>
            <Button
              onPress={() => {
                setIsVisible(false);
              }}
            >
              Басты бетке қайту
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  headerText: {
    fontFamily: typography.medium,
    fontSize: 20,
    color: palette.lightDark,
  },
  text: {
    fontFamily: typography.light,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default React.memo(LevelGridItem);
