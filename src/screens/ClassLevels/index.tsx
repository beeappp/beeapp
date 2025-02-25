import { FlatList, Spinner, View, VStack } from '@gluestack-ui/themed';
import React, { useRef, useState } from 'react';
import { Layout } from '../../navigator/Layout';
import LevelGridItem from '../../components/LevelGridItem';

import { Dimensions, Platform } from 'react-native';
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
import { useAtomValue, useSetAtom } from 'jotai';
import { ChoosenClassAtom, CoursesItemsAtom } from '../../tools/atoms/common';

const { height } = Dimensions.get('window');

const ClassLevelsScreen = () => {
  const { t } = useTranslation();
  const { courses, getCourses } = useCourses();
  const navigation = useNavigation<LessonScreenProps['navigation']>();

  const { getLessonsByCourseId } = useLessons();
  const { getExercisesByCourseId } = useExercises();
  const setChoosenClass = useSetAtom(ChoosenClassAtom);
  const finishedCourses = useAtomValue(CoursesItemsAtom);

  const bottomSheetModalRef = useRef<BSModal>(null);

  const [state, setState] = useState<Course[]>(courses?.data || []);
  const [currentCourse, setCurrentCourse] = useState<number | null>(null);
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState<'Exercise' | 'VideoLesson' | null>(
    null
  );

  console.log('finishedCourses', finishedCourses);
  const renderItem: any = ({
    item,
    index,
  }: {
    item: Course;
    index: number;
  }) => {
    let disabled = !!index;
    let halfLock = false;
    let finished = false;
    const currentFinishedCourse = finishedCourses[item.id];
    console.log('currentFinishedCourse', currentFinishedCourse);
    const prevFinishedCourse = index && finishedCourses[state[index - 1].id];

    if (currentFinishedCourse) {
      if (
        currentFinishedCourse.videoLessonFinished &&
        currentFinishedCourse.exercisesFinished
      ) {
        finished = true;
      } else if (
        currentFinishedCourse.videoLessonFinished !==
        currentFinishedCourse.exercisesFinished
      ) {
        halfLock = true;
      }
    }

    if (prevFinishedCourse) {
      if (
        prevFinishedCourse.videoLessonFinished &&
        prevFinishedCourse.exercisesFinished
      ) {
        disabled = false;
      }
    }
    console.log('halfLock', halfLock);
    return (
      <LevelGridItem
        item={item}
        index={index}
        PickingClass={PickingClass}
        disabled={disabled}
        halfLock={halfLock}
        finished={finished}
      />
    );
  };

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
      setChoosenClass(currentCourse + 1);
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

  const onLoadMore = async () => {
    console.log('load');
    if (loadingMore || !state.length) {
      return;
    }
    setLoadingMore(true);
    if (state.length && courses) {
      try {
        const res = await getCourses(courses.current_page + 1);
        setState(prev => [...prev, ...res.data]);
        setTimeout(() => {
          setLoadingMore(false);
        }, 1000);
      } catch (e) {
        console.log(e);
        setLoadingMore(false);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout bottom top padding>
        <VStack flex={1}>
          <FlatList
            w={'100%'}
            height={height}
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: 68,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 20,
            }}
            data={state || []}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
            onEndReached={() => {
              setCallOnScrollEnd(true);
            }}
            onMomentumScrollEnd={event => {
              const { contentOffset } = event.nativeEvent;
              if (callOnScrollEnd && contentOffset.y > 0) {
                onLoadMore();
              }
              setCallOnScrollEnd(false);
            }}
            ListFooterComponent={
              loadingMore ? (
                <View
                  ml={55}
                  mt={25}
                  height={36}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner size={'large'} color={'green'} />
                </View>
              ) : null
            }
          />
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
