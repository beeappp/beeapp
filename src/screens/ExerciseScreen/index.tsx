import { Box, HStack, VStack } from '@gluestack-ui/themed';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Dimensions, FlatList, TouchableOpacity } from 'react-native';

// components

//styles
import { styles } from './styles';

// theme
import { palette } from '../../theme/palette';
import { useNavigation } from '@react-navigation/native';
import TabHeader from '../../components/TabHeader';
import { Layout } from '../../navigator/Layout';
import Text from '../../components/Text/Text';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModalProvider,
  BottomSheetModal as BSModal,
} from '@gorhom/bottom-sheet';
import { LessonScreenProps } from '../../navigator/lessonStackNavigator';
import BottomSheetModal from '../../components/BottomSheetModal';
import MultipleChoiceAudio from '../../components/ExerciseItems/MultipleChoiceAudio';
// import MultipleChoiceVideo from '../../components/ExerciseItems/MultipleChoiceVideo';
// import MultipleChoiceTranscript from '../../components/ExerciseItems/MultipleChoiceTranscript';
// import RecordExercise from '../../components/ExerciseItems/RecordExercise';
import MakeSentenceExercise from '../../components/ExerciseItems/MakeSentenceExercise';
import ExitModal from '../../components/ExerciseModals/ExitModal';
import WorkMistakes from '../../components/ExerciseModals/WorkMistakes';
import ExerciseAnswerModal from '../../components/ExerciseModals/ExerciseAnswerModal';
import { useExercises } from '../../store/exercise';
import MistakenExerciseIcon from '../../assets/icons/MistakenExercise/MistakenExerciseIcon';
import { ExercisesByCourse } from '../../store/exercise/types';
import { useLessons } from '../../store/lesson';
import { useAtom } from 'jotai';
import { CoursesItemsAtom } from '../../tools/atoms/common';

const { width } = Dimensions.get('window');

const ExerciseScreen = () => {
  const navigation = useNavigation<LessonScreenProps['navigation']>();

  const flatListRef = useRef<FlatList | null | any>(null);
  const bottomSheetModalRef = useRef<BSModal>(null);
  const { exercisesByCourse } = useExercises();

  const exercises = useMemo(() => {
    return exercisesByCourse || [];
  }, [exercisesByCourse]);

  console.log('exercises', exercises);

  //using ref because of state update problems
  const listIndexRef = useRef(0);
  const stepRef = useRef(exercises.length);
  // const [step, setStep] = useState<number>(5);
  // const [listIndex, setListIndex] = useState<number>(0);

  const [modalType, setModalType] = useState(0);
  const [itemData, setItemData] = useState<ExercisesByCourse[]>(exercises);
  const [refreshData, setRefreshData] = useState<any>([]);
  const [finishedWork, setFinishedWork] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<ExercisesByCourse[]>([]);
  const [progress, setProgress] = useState<number>(exercises.length);
  console.log('wrongAnswers', wrongAnswers);

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

  const openGoBackModal = async () => {
    setModalType(1);
    open();
  };

  const openWithMistakeModal = async () => {
    if (!exercises[0]) {
      return;
    }
    setModalType(2);
    open();
    if (courses[exercises[0].course_id]) {
      const newCourse = {
        ...courses[exercises[0].course_id],
        exercisesFinished: true,
      };
      setCourse({ ...courses, [exercises[0].course_id]: newCourse });
    } else {
      setCourse({
        ...courses,
        [exercises[0].course_id]: {
          videoLessonFinished: false,
          exercisesFinished: true,
        },
      });
    }
  };

  const moveNextQuestion = () => {
    listIndexRef.current += 1;
    stepRef.current -= 1;
  };

  const openCorrectModal = async () => {
    setModalType(3);
    setCorrectAnswer(true);
    const currentQuestion = itemData[listIndexRef.current];
    setWrongAnswers(prev =>
      prev.filter(item => item.id !== currentQuestion.id)
    );
    open();
  };

  const openWrongModal = async () => {
    setModalType(3);
    setCorrectAnswer(false);
    const currentQuestion = itemData[listIndexRef.current];

    if (!wrongAnswers.find(e => e.id === currentQuestion.id)) {
      setWrongAnswers(prev => [...prev, currentQuestion]);
    }
    open();
  };

  const closeAfterAnswer = async () => {
    setProgress(prev => prev - 1);

    if (stepRef.current === 1) {
      setTimeout(() => {
        if (wrongAnswers.length > 0) {
          //solution for time, hardcode
          if (wrongAnswers.length == 1 && correctAnswer && itemData.length == 1)
            setFinishedWork(true);
          openWithMistakeModal();
        } else if (wrongAnswers.length == 0) {
          setFinishedWork(true);
          openWithMistakeModal();
        }
      }, 500);
    } else {
      if (listIndexRef.current < itemData.length) {
        flatListRef.current.scrollToIndex({
          index: listIndexRef.current + 1,
          animated: true,
        });

        moveNextQuestion();
      } else {
        console.log('End of the list');
      }
    }
    close();
  };

  const startWorkWithMistake = async () => {
    setItemData(wrongAnswers);
    flatListRef.current.scrollToIndex({
      index: 0,
      animated: true,
    });
    setProgress(wrongAnswers.length); // change logic
    setRefreshData(wrongAnswers);
    stepRef.current = wrongAnswers.length;
    listIndexRef.current = 0;

    close();
  };

  const goBackWrongExercise = async (index: number) => {
    if (itemData.length > 1) {
      setProgress(prev => prev + 1);
      listIndexRef.current -= 1;
      stepRef.current += 1;
      flatListRef.current.scrollToIndex({
        index: index - 1,
        animated: true,
      });
    }
  };

  const ExerciseType = (item: ExercisesByCourse) => {
    switch (item.question.type) {
      case 1:
        return (
          <MultipleChoiceAudio
            questionItem={item.question}
            openCorrect={openCorrectModal}
            openWrong={openWrongModal}
          />
        );
      case 2:
        return (
          <MakeSentenceExercise
            questionItem={item.question}
            openCorrect={openCorrectModal}
            openWrong={openWrongModal}
          />
        );

      case 3:
        return (
          <MultipleChoiceAudio
            questionItem={item.question}
            openCorrect={openCorrectModal}
            openWrong={openWrongModal}
          />
        );
      // case 4:
      //   return (
      //     <MultipleChoiceVideo
      //       openCorrect={openCorrectModal}
      //       openWrong={openWrongModal}
      //     />
      //   );

      // case 3:
      //   return (
      //     <MultipleChoiceTranscript
      //       openCorrect={openCorrectModal}
      //       openWrong={openWrongModal}
      //     />
      //   );

      // case 2:
      //   return (
      //     <RecordExercise
      //       openCorrect={openCorrectModal}
      //       openWrong={openWrongModal}
      //     />
      //   );

      // case 1:
      //   return (
      //     <MakeSentenceExercise
      //       openCorrect={openCorrectModal}
      //       openWrong={openWrongModal}
      //     />
      //   );
    }
  };

  const { getLessonsByCourseId } = useLessons();
  const [courses, setCourse] = useAtom(CoursesItemsAtom);

  const ModalTypes = useCallback(
    (type: number) => {
      switch (type) {
        case 1:
          return (
            <ExitModal onPressTop={navigation.goBack} onPressBottom={close} />
          );
        case 2:
          return (
            <WorkMistakes
              onPressTop={navigation.goBack}
              onPressBottom={
                finishedWork
                  ? async () => {
                      try {
                        if (exercises[0]) {
                          await getLessonsByCourseId(exercises[0].course_id);
                          navigation.replace('VideoLesson');
                        }
                      } catch (e) {
                        navigation.goBack();
                        console.log('Error ', e);
                      }
                    }
                  : startWorkWithMistake
              }
              finished={finishedWork}
            />
          );
        case 3:
          return (
            <ExerciseAnswerModal
              onPress={closeAfterAnswer}
              correct={correctAnswer}
            />
          );
      }
    },
    [correctAnswer, finishedWork, closeAfterAnswer, navigation]
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Box flex={1} width={width}>
        <Layout bottom top padding>
          <VStack flex={1} alignItems="center">
            <TabHeader
              headerStyle={styles.header}
              variant={'withBackIcon'}
              onPress={openGoBackModal}
              cancelIcon
              progressBar
              progressValue={100 / progress}
            />
            {refreshData.length != 0 && (
              <TouchableOpacity
                style={styles.wrongGoBackContainer}
                onPress={() => goBackWrongExercise(index)}
              >
                <HStack alignItems="center" gap={10}>
                  <MistakenExerciseIcon />
                  <Text style={styles.text}>Алдыңғы қате</Text>
                </HStack>
              </TouchableOpacity>
            )}
            {ExerciseType(item)}
          </VStack>
        </Layout>
      </Box>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Layout>
          <VStack flex={1}>
            <FlatList
              ref={flatListRef}
              data={itemData}
              renderItem={renderItem}
              extraData={refreshData}
              keyExtractor={item => String(item.id)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={0}
              scrollEnabled={false}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
            />
          </VStack>
        </Layout>
        <BottomSheetModal
          modalRef={bottomSheetModalRef}
          modalHeight={modalType == 3 ? 170 : 308}
          bgColor={modalType == 3 ? palette.lightDark3 : undefined}
          borderRadius={modalType == 3 ? 1 : undefined}
          noBackDrop={modalType == 3}
        >
          {ModalTypes(modalType)}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;
