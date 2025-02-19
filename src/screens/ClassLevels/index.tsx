import { FlatList, Pressable, View, VStack } from '@gluestack-ui/themed';
import React, { useCallback, useRef, useState } from 'react';
import { Layout } from '../../navigator/Layout';
import LevelGridItem from '../../components/LevelGridItem';
import LevelGridIcon from '../../assets/icons/LevelScreen/LevelGridIcon';
import BlankMediumIcon from '../../assets/icons/LevelScreen/BlankMediumIcon';
import BlankSmallIcon from '../../assets/icons/LevelScreen/BlankSmallIcon';
import { Platform } from 'react-native';
import { useCourses } from '../../store/courses';
import {
  BottomSheetModalProvider,
  BottomSheetModal as BSModal,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetModal from '../../components/BottomSheetModal';
import Text from '../../components/Text/Text';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import Button from '../../components/Button/Button';
import { Portal } from '@gorhom/portal';
import { LessonScreenProps } from '../../navigator/lessonStackNavigator';
import { useTranslation } from 'react-i18next';
import { Course } from '../../store/courses/types';
import { useLessons } from '../../store/lesson';
import { useExercises } from '../../store/exercise';
import { useNavigation } from '@react-navigation/native';

const ClassLevelsScreen = () => {
  const { t } = useTranslation();
  const { courses, getCourses } = useCourses();
  const navigation = useNavigation<LessonScreenProps['navigation']>();

  const { getLessonsByCourseId } = useLessons();
  const { getExercisesByCourseId } = useExercises();

  const bottomSheetModalRef = useRef<BSModal>(null);

  const [state, setState] = useState<Course[]>(courses?.data || []);
  const [visibleItems, setVisibleItems] = useState<number>(4);
  const [currentCourse, setCurrentCourse] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<'Exercise' | 'VideoLesson' | null>(
    null
  );

  const renderItem: any = ({
    item,
    index,
  }: {
    item: Course;
    index: number;
  }) => <LevelGridItem item={item} index={index} PickingClass={PickingClass} />;

  const PickingClass = async (index: number) => {
    setCurrentCourse(index);
    open();
  };

  const open = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    }
  };
  const close = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  const loadMoreItems = useCallback(async () => {
    if (visibleItems + 4 == state.length && courses) {
      const res = await getCourses(courses?.current_page + 1);
      setState(prev => [...prev, ...res.data]);
    }
    setVisibleItems(prevVisibleItems => prevVisibleItems + 4);
  }, [courses, visibleItems, state]);

  const goToCourse = async (screen: 'Exercise' | 'VideoLesson') => {
    if (currentCourse === null) {
      close();
      return;
    }
    setIsLoading(screen);
    const getFunction =
      screen === 'VideoLesson' ? getLessonsByCourseId : getExercisesByCourseId;
    try {
      await getFunction(state[currentCourse].id);
      navigation.navigate('LessonStack', {
        screen,
      });
      close();
      setIsLoading(null);
    } catch (error: any) {
      console.log('error', error);
      close();
      setIsLoading(null);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout bottom top padding>
        <VStack flex={1}>
          {/* <ClassHeader
            // id={choseClass}
            onPress={() => {
              navigation.navigate('LessonStack');
            }}
            classTitle="Араб алфавитін үйрену"
          /> */}
          <View flex={1} alignItems="center" justifyContent="space-between">
            <FlatList
              w={'100%'}
              marginTop={30}
              showsVerticalScrollIndicator={false}
              style={{ paddingTop: 24 }}
              data={state.slice(0, visibleItems) || []} //courses
              renderItem={renderItem}
              keyExtractor={(_, i) => i.toString()}
              ListFooterComponent={
                visibleItems < state.length ? (
                  <View
                    ml={55}
                    mt={-10}
                    marginBottom={Platform.select({ android: 120, ios: 100 })}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <View position="absolute" left={17} top={10}>
                      <BlankMediumIcon />
                    </View>
                    <View position="absolute" right={42} top={20}>
                      <BlankSmallIcon />
                    </View>
                    <Pressable
                      overflow="hidden"
                      onPress={loadMoreItems}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <LevelGridIcon logo />
                    </Pressable>
                  </View>
                ) : (
                  <View
                    marginBottom={Platform.select({ android: 120, ios: 100 })}
                  />
                )
              }
            />
          </View>
        </VStack>
      </Layout>

      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal modalRef={bottomSheetModalRef} modalHeight={308}>
            {currentCourse !== null && state[currentCourse] ? (
              <View flex={1} alignItems="center" paddingHorizontal={20}>
                <VStack
                  w={'100%'}
                  justifyContent="flex-start"
                  mt={Platform.select({ android: 0, ios: 10 })}
                >
                  <Text
                    color={palette.lightDark}
                    style={{ fontFamily: typography.medium, fontSize: 24 }}
                  >
                    {state[currentCourse].title}
                  </Text>
                  <Text
                    color={palette.lightDark}
                    style={{
                      fontFamily: typography.regular,
                      fontSize: 18,
                      opacity: 0.6,
                    }}
                  >
                    {state[currentCourse].description}
                  </Text>
                </VStack>
                <VStack width={'100%'} gap={7} mt={30}>
                  <Button
                    onPress={() => goToCourse('VideoLesson')}
                    colors={palette.lightDark2}
                    bgColor={palette.white}
                    textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
                    isLoading={isLoading === 'VideoLesson'}
                    disabled={isLoading === 'VideoLesson'}
                  >
                    {t('watch_video')}
                  </Button>
                  <Button
                    onPress={() => goToCourse('Exercise')}
                    textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
                    isLoading={isLoading === 'Exercise'}
                    disabled={isLoading === 'Exercise'}
                  >
                    {t('do_exercise')}
                  </Button>
                </VStack>
              </View>
            ) : null}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </GestureHandlerRootView>
  );
};

export default ClassLevelsScreen;
