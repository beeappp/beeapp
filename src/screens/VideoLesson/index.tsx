import { Pressable, Spinner, View, VStack } from '@gluestack-ui/themed';
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal as BSModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetModal from '../../components/BottomSheetModal';

import { HomeScreenProps } from '../../navigator/homeStackNavigator';
import { useLessons } from '../../store/lesson';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Alert, Dimensions, Platform, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { check, PERMISSIONS } from 'react-native-permissions';
import { requestPermissions } from '../../utils/requestAudioPermission';
import { useTranslation } from 'react-i18next';

import YoutubePlayer from 'react-native-youtube-iframe';
import CorrectRecordIcon from '../../assets/icons/CorrectRecordicon/CorrectrecordIcon';
import { useExercises } from '../../store/exercise';
import { useAtom } from 'jotai';
import { CoursesItemsAtom } from '../../tools/atoms/common';

const { width, height } = Dimensions.get('window');

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
          file_path: lessonsByCourseId[0].file_path
            .replace('https://youtube.com/shorts/', '')
            .split('?')[0],
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
  const [playing, setPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [loopCount, setLoopCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [courses, setCourse] = useAtom(CoursesItemsAtom);

  const isLooped = useMemo(() => loopCount > 0, [loopCount]);

  const init = async () => {
    if (Platform.OS === 'android') {
      const res = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (res == 'granted' && !playing) {
        togglePlaying();
      } else await requestPermissions();
    } else {
      const res = await check(PERMISSIONS.IOS.MICROPHONE);
      if (res == 'blocked')
        Alert.alert(
          'Микрофон рұқсаты қабылданбады. Құрылғы параметрлеріне өтіп, рұқсатты қолмен беріңіз.'
        );
      if (res == 'granted' && !playing) {
        togglePlaying();
      } else await requestPermissions();
    }
  };

  useEffect(() => {
    if (!initialized) {
      init();
    }
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

  const diff = useMemo(() => {
    if (currentTimecodeIndex >= timecodes.length) {
      return 0;
    }
    return (
      (convertSecond(timecodes[currentTimecodeIndex].end_duration) -
        convertSecond(timecodes[currentTimecodeIndex].duration)) *
      1000
    );
  }, [timecodes, currentTimecodeIndex]);

  const handleRewind = async (time: number) => {
    await playerRef.current?.seekTo(time);
  };

  const checkAudio = useCallback(
    async (audio64: string, sampleRate: string | null) => {
      setIsLoading(true);
      try {
        togglePlaying();
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

  const exitVideoLesson = useCallback(() => {
    setTypeModal(1);
    open();
  }, []);

  const resultModal = useCallback(() => {
    setTypeModal(2);
    open();
  }, []);

  const onStateChange = useCallback((state: any) => {
    if (!initialized && state === 'playing') {
      setInitialized(true);
    }
    if (state === 'ended') {
      correctAnswerModal();
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const elapsed_sec = await playerRef.current?.getCurrentTime();
        const elapsed_ms = Math.floor(elapsed_sec * 1000);
        // const ms = elapsed_ms % 1000;
        const min = Math.floor(elapsed_ms / 60000);
        const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

        const startRecord =
          timecodes[currentTimecodeIndex].duration ===
          `00:${min.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;

        if (startRecord) {
          setIsRecording(true);
          console.log('startRecord', timecodes[currentTimecodeIndex].duration);
        }

        const fullTime =
          min.toString().padStart(2, '0') +
          ':' +
          seconds.toString().padStart(2, '0');

        setCurrentTime(fullTime);
      }
    }, 1000); // 1000ms

    return () => {
      clearInterval(interval);
    };
  }, [
    timecodes,
    currentTimecodeIndex,
    setCurrentTimecodeIndex,
    loopCount,
    isRecording,
    isCorrect,
    isLooped,
  ]);

  const modalData = useMemo(() => {
    return {
      0: {
        title: 'video_nextHeader',
        description: '',
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
        bottomButtonFunc: () => navigation.goBack(),
        bottomButtonDisabled: false,
        optionalButtonText: '',
        optionalButtonFunc: () => {},
      },
      2: {
        title: !isCorrect ? 'wrongAnswer' : 'correctAnswer',
        description: loopCount >= 3 ? 'tryLater' : '',
        topButtonText: 'tryAgain',
        topButtonFunc: async () => {
          setLoopCount(prev => prev + 1);
          await handleRewind(
            convertSecond(timecodes[currentTimecodeIndex].duration) - 1
          );
          togglePlaying();
          close();
        },
        topButtonDisabled: loopCount >= 3 || !!isCorrect,
        bottomButtonText: 'continue_answer',
        bottomButtonFunc: () => {
          setCurrentTimecodeIndex(prev => prev + 1);
          setLoopCount(0);
          togglePlaying();
          close();
        },
        bottomButtonDisabled: isCorrect ? false : loopCount < 3,
        optionalButtonText: '',
        optionalButtonFunc: () => {},
        // optionalButtonText: 'video_stay',
        // optionalButtonFunc: () => navigation.goBack(),
      },
    };
  }, [loopCount, isCorrect]);

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
                  title={currentTime}
                  titleColor={palette.greyScale9}
                  onPress={exitVideoLesson}
                  headerStyle={{ paddingHorizontal: 21, marginTop: top }}
                />
              </View>

              <>
                {!initialized ? (
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 3,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Spinner color={'white'} size={'large'} />
                  </View>
                ) : null}
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                  }}
                >
                  <Pressable
                    style={{ width: '100%', height: '100%' }}
                    onPress={togglePlaying}
                    disabled={isRecording || isLooped}
                  />
                </View>
                <View style={{ position: 'absolute', top: -75 }}>
                  <YoutubePlayer
                    ref={playerRef}
                    width={width}
                    height={height + 150}
                    play={playing}
                    videoId={currentLesson?.file_path}
                    onChangeState={onStateChange}
                    initialPlayerParams={{
                      controls: false,
                    }}
                    webViewProps={{
                      injectedJavaScript: `
                        var element = document.getElementsByClassName('container')[0];
                        element.style.position = 'unset';
                        true;
                      `,
                    }}
                  />
                </View>
              </>
              <VStack style={styles.icon}>
                {isRecording && !isLoading ? (
                  <Recorder
                    stopRecording={checkAudio}
                    startedRecord={AudioRecord.onStartRecord}
                    stopRecord={AudioRecord.onStopRecord}
                    recordDuration={diff}
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
