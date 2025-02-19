import { HStack, Pressable, View } from '@gluestack-ui/themed';
import React, { FC } from 'react';
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

interface Props {
  item: Course;
  index: number;
  PickingClass: (index: number) => void;
}

const backgroundLayout = ['first', 'second', 'third', 'fourth'];

const LevelGridItem: FC<Props> = ({ item, index, PickingClass }) => {
  const { published, color, image_path, id } = item;
  const [choseClass, setChoseClass] = useAtom(chosenGrid);

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
                    setChoseClass(`${id}`);
                    PickingClass(index);
                  }}
                >
                  <LevelGridIcon
                    color={color || '#8CC14A'}
                    index={number}
                    halfLock={false} //halflock
                    image={image_path}
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
  );
};

export default React.memo(LevelGridItem);
