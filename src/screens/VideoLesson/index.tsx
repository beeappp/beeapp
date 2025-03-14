import { View, VStack } from '@gluestack-ui/themed';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Layout } from '../../navigator/Layout';
import TabHeader from '../../components/TabHeader';
import { useNavigation } from '@react-navigation/native';
import { LessonScreenProps } from '../../navigator/lessonStackNavigator';
import CustomButton from '../../components/Button/Button';
import Recorder from '../../components/Recorder';
import Text from '../../components/Text/Text';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import AudioRecorder from '../../components/AudioRecord';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  BottomSheetModal as BSModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetModal from '../../components/BottomSheetModal';

import { HomeScreenProps } from '../../navigator/homeStackNavigator';
import { useLessons } from '../../store/lesson';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Alert, Platform } from 'react-native';

import { styles } from './styles';
import { check, PERMISSIONS } from 'react-native-permissions';
import { requestPermissions } from '../../utils/requestAudioPermission';
import { useTranslation } from 'react-i18next';

// import YoutubePlayer from 'react-native-youtube-iframe';
import CorrectRecordIcon from '../../assets/icons/CorrectRecordicon/CorrectrecordIcon';
import { useExercises } from '../../store/exercise';
import { useAtom } from 'jotai';
import { CoursesItemsAtom } from '../../tools/atoms/common';

import CustomVideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const android = Platform.OS == 'android';

const convertSecond = (time: string) => {
  const timeArr = time.split(':');
  const hour = timeArr[0];
  const min = timeArr[1];
  const sec = timeArr[2];
  return Number(hour) * 3600 + Number(min) * 60 + Number(sec);
};

const VideoLessonScreen = () => {
  const navigation = useNavigation<
    HomeScreenProps['navigation'] & LessonScreenProps['navigation']
  >();
  const playerRef = useRef<any>();

  const { top } = useSafeAreaInsets();
  const { lessonsByCourseId, checkLesson } = useLessons();
  const { getExercisesByCourseId } = useExercises();

  const { t } = useTranslation();
  const [currentTimecodeIndex, setCurrentTimecodeIndex] = useState<number>(0);

  const currentLesson = useMemo(() => {
    return lessonsByCourseId && lessonsByCourseId[0]
      ? {
          ...lessonsByCourseId[0],
          file_path: lessonsByCourseId[0].file_path || '',
        }
      : null;
  }, [lessonsByCourseId]);

  const timecodes = useMemo(() => {
    return currentLesson && currentLesson.timecodes
      ? [...currentLesson.timecodes].sort(
          (a, b) => convertSecond(a.duration) - convertSecond(b.duration)
        )
      : [];
  }, [currentLesson]);

  const bottomSheetModalRef = useRef<BSModal>(null);
  const AudioRecord = AudioRecorder();

  const [typeModal, setTypeModal] = useState<0 | 1 | 2>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [loopCount, setLoopCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [courses, setCourse] = useAtom(CoursesItemsAtom);

  const init = async () => {
    if (Platform.OS === 'android') {
      const res = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (res == 'granted') {
        setInitialized(true);
        setTimeout(() => {
          resume();
        }, 100);
      } else {
        await requestPermissions().then(() => {
          setInitialized(true);
          setTimeout(() => {
            resume();
          }, 100);
        });
      }
    } else {
      const res = await check(PERMISSIONS.IOS.MICROPHONE);
      if (res == 'blocked')
        Alert.alert(
          'Микрофон рұқсаты қабылданбады. Құрылғы параметрлеріне өтіп, рұқсатты қолмен беріңіз.'
        );
      if (res == 'granted') {
        setInitialized(true);
        setTimeout(() => {
          resume();
        }, 100);
      } else {
        await requestPermissions().then(() => {
          setInitialized(true);
          setTimeout(() => {
            resume();
          }, 100);
        });
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

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

  const handleRewind = async (time: number) => {
    await playerRef.current?.seek(time);
    await playerRef.current?.resume(time);
  };

  const checkAudio = useCallback(
    async (audio64: string, sampleRate: string | null) => {
      setIsLoading(true);
      try {
        setIsRecording(false);
        const data = await checkLesson({
          resource_id: timecodes[currentTimecodeIndex].id || 0,
          resource_type: 'lesson_timecodes',
          audio_base_64: audio64,
          sample_rate: sampleRate || '0',
        });

        if (data.result) {
          setIsCorrect(true);
        }

        resultModal();
        setIsLoading(false);
      } catch (error: any) {
        console.log('error checkLesson', error);
        resultModal();
        setIsLoading(false);
      }
    },
    [
      isRecording,
      currentLesson,
      loopCount,
      timecodes,
      currentTimecodeIndex,
      setCurrentTimecodeIndex,
    ]
  );

  const correctAnswerModal = useCallback(() => {
    if (!currentLesson) {
      return;
    }
    setTypeModal(0);
    open();
    if (courses[currentLesson.course_id]) {
      const newCourse = {
        ...courses[currentLesson.course_id],
        videoLessonFinished: true,
      };
      setCourse({ ...courses, [currentLesson.course_id]: newCourse });
    } else {
      setCourse({
        ...courses,
        [currentLesson.course_id]: {
          videoLessonFinished: true,
          exercisesFinished: false,
        },
      });
    }
  }, []);

  const onEnd = () => {
    correctAnswerModal();
  };

  const exitVideoLesson = useCallback(() => {
    setTypeModal(1);
    open();
  }, []);

  const resultModal = useCallback(() => {
    setTypeModal(2);
    open();
  }, []);

  const modalData = useMemo(() => {
    return {
      0: {
        title: 'video_nextHeader',
        description: 'video_description',
        topButtonText: 'video_nextBack',
        topButtonFunc: () => navigation.navigate('HomeStack'),
        topButtonDisabled: false,
        bottomButtonText: 'video_toExercise',
        bottomButtonFunc: async () => {
          try {
            if (currentLesson) {
              await getExercisesByCourseId(currentLesson.course_id);
              navigation.replace('Exercise');
            }
          } catch (e) {
            console.log('Error ', e);
            playerRef.current?.pause?.();
            navigation.goBack();
          }
        },
        bottomButtonDisabled: false,
        optionalButtonText: '',
        optionalButtonFunc: () => {},
      },
      1: {
        title: 'video_exitHeader',
        description: 'video_exitText',
        topButtonText: 'video_exit',
        topButtonFunc: close,
        topButtonDisabled: false,
        bottomButtonText: 'video_stay',
        bottomButtonFunc: () => {
          playerRef.current?.pause?.();
          navigation.goBack();
        },
        bottomButtonDisabled: false,
        optionalButtonText: '',
        optionalButtonFunc: () => {},
      },
      2: {
        title: !isCorrect ? 'good' : 'correctAnswer',
        description:
          !isCorrect && loopCount >= 3 ? 'tryLater' : 'retrySubTitle',
        topButtonText: 'tryAgain',
        topButtonFunc: async () => {
          setLoopCount(prev => prev + 1);
          await handleRewind(
            convertSecond(timecodes[currentTimecodeIndex].duration) - 1
          );
          resume();
          close();
        },
        topButtonDisabled: loopCount >= 3 || !!isCorrect,
        bottomButtonText: 'continue_answer',
        bottomButtonFunc: () => {
          setCurrentTimecodeIndex(prev => prev + 1);
          setLoopCount(0);
          resume();
          close();
        },
        bottomButtonDisabled: isCorrect ? false : loopCount < 3,
        optionalButtonText: '',
        optionalButtonFunc: () => {},
        // optionalButtonText: 'video_stay',
        // optionalButtonFunc: () => navigation.goBack(),
      },
    };
  }, [loopCount, isCorrect, playerRef.current]);

  const resume = () => {
    if (playerRef.current) {
      playerRef.current.resume();
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current?.pause?.();
    }
  };

  const handleProgress = (data: { currentTime: number }) => {
    const elapsed_ms = Math.floor(data.currentTime * 1000);
    const min = Math.floor(elapsed_ms / 60000);
    const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
    const fullTime =
      min.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');

    setCurrentTime(fullTime);

    const startRecord =
      timecodes[currentTimecodeIndex]?.duration ===
      `00:${min.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;

    // if (startRecord) {
    //   pause();
    //   setIsRecording(true);
    // }
  };
  console.log('currentLesson', currentLesson);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Layout>
          <VStack flex={1}>
            <View flex={1} bgColor={palette.black}>
              <View style={styles.absoluteHeader}>
                <TabHeader
                  variant={'withBackIconVideo'}
                  headerScreenTitle={currentLesson?.text}
                  title={String(currentTime)}
                  titleColor={palette.greyScale9}
                  onPress={exitVideoLesson}
                  headerStyle={{ paddingHorizontal: 21, marginTop: top }}
                />
              </View>
              {initialized ? (
                <CustomVideoPlayer
                  videoUrl={currentLesson?.file_path}
                  fullSize
                  controlsBottom={50}
                  onProgress={handleProgress}
                  onEnd={onEnd}
                  controlsRef={playerRef}
                  disabledLayout={isRecording}
                  autoplay={false}
                />
              ) : null}
              <VStack style={styles.icon}>
                {isRecording && !isLoading ? (
                  <Recorder
                    stopRecording={checkAudio}
                    startedRecord={AudioRecord.onStartRecord}
                    stopRecord={AudioRecord.onStopRecord}
                    recordDuration={10000}
                  />
                ) : null}
                {!isRecording && isLoading ? (
                  <TouchableOpacity>
                    <CorrectRecordIcon />
                  </TouchableOpacity>
                ) : null}
              </VStack>
            </View>
          </VStack>
        </Layout>
        <BottomSheetModal
          modalRef={bottomSheetModalRef}
          modalHeight={300}
          noBackDrop={true}
          enablePanDownToClose={false}
        >
          <View flex={1} alignItems="center" paddingHorizontal={20}>
            <VStack
              w={'100%'}
              justifyContent="flex-start"
              mt={android ? 0 : 10}
            >
              <Text
                color={palette.lightDark}
                style={{ fontFamily: typography.medium, fontSize: 24 }}
              >
                {t(modalData[typeModal].title)}
              </Text>
              {modalData[typeModal].description && (
                <Text
                  color={palette.lightDark}
                  style={{
                    fontFamily: typography.regular,
                    fontSize: 18,
                    opacity: 0.6,
                  }}
                >
                  {t(modalData[typeModal].description)}
                </Text>
              )}
            </VStack>
            <VStack width={'100%'} gap={7} mt={30}>
              <CustomButton
                onPress={modalData[typeModal].topButtonFunc}
                colors={palette.lightDark2}
                bgColor={palette.white}
                textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
                disabled={modalData[typeModal].topButtonDisabled}
              >
                {t(modalData[typeModal].topButtonText)}
              </CustomButton>
              <CustomButton
                onPress={modalData[typeModal].bottomButtonFunc}
                textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
                disabled={modalData[typeModal].bottomButtonDisabled}
              >
                {t(modalData[typeModal].bottomButtonText)}
              </CustomButton>

              {modalData[typeModal].optionalButtonText && (
                <CustomButton
                  onPress={modalData[typeModal].optionalButtonFunc}
                  textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
                >
                  {t(modalData[typeModal].optionalButtonText)}
                </CustomButton>
              )}
            </VStack>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default VideoLessonScreen;
