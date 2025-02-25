import { Box, Spinner, View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import SoundIcon from '../../assets/icons/Sound/SoundIcon';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC, useEffect, useMemo, useState } from 'react';
import AcitveSoundIcon from '../../assets/icons/Sound/AcitveSoundIcon';
import { useTranslation } from 'react-i18next';
import { Question } from '../../store/exercise/types';
import { useQuestion } from '../../store/question';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Props {
  questionItem: Question;
  openCorrect: () => void;
  openWrong: () => void;
}

const { width } = Dimensions.get('window');

const MultipleChoiceAudio: FC<Props> = ({
  questionItem,
  openCorrect,
  openWrong,
}) => {
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const { answerQuestion } = useQuestion();
  const { t } = useTranslation();

  const questionType = useMemo(() => {
    return questionItem.type;
  }, [questionItem.type]);

  const questionFilePath = useMemo(() => {
    return questionItem.file_path;
  }, [questionItem.file_path]);

  const youtubePath = useMemo(() => {
    return questionType === 3
      ? questionFilePath.replace('https://youtu.be/', '').split('?')[0]
      : ' ';
  }, [questionType, questionFilePath]);

  const playbackState = usePlaybackState();

  const togglePlayback = async (playbackState: string) => {
    const audioPath = questionFilePath
      ? questionFilePath.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      : '';

    try {
      if (playbackState === State.Playing) {
        await TrackPlayer.pause();
      } else {
        setIsAudioLoading(true);
        await TrackPlayer.add({
          id: questionItem.id,
          url: audioPath,
          title: 'Audio',
          artist: 'Unknown',
        });
        await TrackPlayer.play();
      }
    } catch (error) {
      console.log('play error', error);
    }
  };

  const handlePress = (id: number) => {
    setSelectedId(id);
  };

  const submitPress = async (id: any) => {
    if (!id) {
      return;
    }

    try {
      const answer = await answerQuestion({
        exercise_id: questionItem.id,
        options: [id],
      });

      if (answer.data) {
        openCorrect();
      } else {
        openWrong();
      }
    } catch (error) {
      console.log('error', error);
      openWrong();
    }
  };

  useEffect(() => {
    setActiveSound(playbackState.state === State.Playing);
    if (playbackState.state === State.Ready) {
      setIsAudioLoading(false);
    }
  }, [playbackState]);

  const resetPlayer = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
  };

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
    console.log('reset');
    await resetPlayer();
  });

  useEffect(() => {
    return () => {
      resetPlayer();
    };
  }, []);

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      alignItems="center"
      justifyContent="space-between"
      pt={50}
      pb={25}
    >
      <Text style={[styles.headerText, { writingDirection: 'ltr' }]}>
        {questionItem.question_text}
      </Text>

      {questionFilePath && questionType !== 3 ? (
        <TouchableOpacity
          onPress={() => togglePlayback(playbackState.state || '')}
          disabled={activeSound || isAudioLoading}
        >
          {isAudioLoading ? (
            <Box w={115} h={115} justifyContent={'center'}>
              <Spinner color={palette.lightDark2} size={'large'} />
            </Box>
          ) : activeSound ? (
            <AcitveSoundIcon />
          ) : (
            <SoundIcon />
          )}
        </TouchableOpacity>
      ) : questionType === 3 && youtubePath ? (
        <Box
          width={width - 40}
          height={220}
          overflow="hidden"
          borderRadius={20}
        >
          <YoutubePlayer
            webViewStyle={{ right: 370 }}
            width={width + 700}
            height={220}
            videoId={youtubePath}
            initialPlayerParams={{
              controls: false,
              // showClosedCaptions: true,
              loop: true,
              // modestbranding: false,
              // rel: false,
            }}
            webViewProps={{
              injectedJavaScript: `
          var element = document.getElementsByClassName('container')[0];
          element.style.position = 'unset';
          true;
        `,
            }}
          />
        </Box>
      ) : null}

      <View style={styles.container}>
        {questionItem.options.map(item => (
          <Pressable
            key={item.id}
            onPress={() => handlePress(item.id)}
            style={[
              styles.itemContainer,
              selectedId === item.id ? styles.answer : null,
            ]}
          >
            <Text
              style={[
                styles.itemText,
                selectedId === item.id ? styles.selectedText : {},
              ]}
            >
              {item.arabic_text}
              <Text
                style={[
                  styles.itemText,
                  selectedId === item.id ? styles.selectedText : {},
                ]}
              >
                {item.simple_text}
              </Text>
            </Text>
          </Pressable>
        ))}
      </View>

      <Button
        colors={palette.lightDark3}
        bgColor={palette.white}
        borderColor={palette.white}
        textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
        onPress={() => {
          submitPress(selectedId);
        }}
      >
        {t('confirm')}
      </Button>
    </VStack>
  );
};

export default React.memo(MultipleChoiceAudio);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 15,
  },
  headerText: {
    marginTop: 50,
    fontFamily: typography.light,
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: palette.greyScale11,
  },
  itemContainer: {
    width: 130,
    height: 60,
    backgroundColor: palette.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  itemText: {
    fontSize: 30,
    color: palette.lightDark2,
    textAlign: 'center',
    fontFamily: typography.arabRegular,
  },
  answer: {
    backgroundColor: palette.lightDark2,
  },
  selectedText: {
    color: '#fff',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderColor: '#000',
  },
  selected: {
    backgroundColor: palette.lightDark2,
  },
  selectedText4: { color: palette.white },
  text: {
    fontSize: 24,
    color: '#000',
  },
});
