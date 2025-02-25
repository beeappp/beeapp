import { Box, HStack, Pressable, Spinner, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import SoundIcon from '../../assets/icons/Sound/SoundIcon';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC, useCallback, useEffect, useState } from 'react';
import AcitveSoundIcon from '../../assets/icons/Sound/AcitveSoundIcon';
import { useTranslation } from 'react-i18next';
import { Question } from '../../store/exercise/types';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useQuestion } from '../../store/question';

interface Props {
  questionItem: Question;
  openCorrect: () => void;
  openWrong: () => void;
}

const MakeSentenceExercise: FC<Props> = ({
  questionItem,
  openCorrect,
  openWrong,
}) => {
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeSound, setActiveSound] = useState<boolean>(false);
  const { answerQuestion } = useQuestion();

  const { t } = useTranslation();

  const playbackState = usePlaybackState();

  const togglePlayback = async (playbackState: string) => {
    const audioPath = questionItem.file_path
      ? questionItem.file_path.replace(
          'www.dropbox.com',
          'dl.dropboxusercontent.com'
        )
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
    await resetPlayer();
  });

  useEffect(() => {
    return () => {
      resetPlayer();
    };
  }, []);

  const choicePress = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const submitPress = useCallback(
    async (ids: number[]) => {
      if (!ids.length) {
        return false;
      }
      try {
        const answer = await answerQuestion({
          exercise_id: questionItem.id,
          options: selectedIds,
        });
        console.log('answer', answer);

        if (answer.data) {
          openCorrect();
        } else {
          openWrong();
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    [selectedIds]
  );

  const answer = selectedIds.length
    ? selectedIds
        .map(id => questionItem.options.find(e => e.id === id)?.simple_text)
        .join(' ')
    : '';

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      alignItems="center"
      justifyContent="space-between"
      pt={50}
      pb={25}
    >
      <VStack alignItems="center" gap={30}>
        <Text style={styles.headerText}>{t('sentence_exercise')}</Text>

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
      </VStack>

      <Text
        style={{
          fontFamily: typography.arabRegular,
          fontSize: 50,
          textAlign: 'center',
        }}
      >
        {answer}
      </Text>
      <VStack>
        <HStack style={styles.container}>
          {questionItem.options.map(choice => (
            <Pressable
              key={choice.id}
              onPress={() => choicePress(choice.id)}
              style={[
                styles.circle,
                selectedIds.includes(choice.id) ? styles.selected : null,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  selectedIds.includes(choice.id) ? styles.selectedText4 : {},
                ]}
              >
                {choice.simple_text}
              </Text>
            </Pressable>
          ))}
        </HStack>
        {/* <HStack style={styles.container}>
          {secondRowChoices.map(choice => (
            <Pressable
              key={choice.id}
              onPress={() => choicePress(choice.id)}
              style={[
                styles.circle,
                selectedIds.includes(choice.id) ? styles.selected : null,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  selectedIds.includes(choice.id) ? styles.selectedText4 : {},
                ]}
              >
                {choice.text}
              </Text>
            </Pressable>
          ))}
        </HStack> */}
      </VStack>

      <Button
        colors={palette.lightDark3}
        bgColor={palette.white}
        borderColor={palette.white}
        textStyle={{ fontFamily: typography.medium, fontSize: 19 }}
        onPress={() => {
          submitPress(selectedIds);
        }}
      >
        {t('confirm')}
      </Button>
    </VStack>
  );
};

export default React.memo(MakeSentenceExercise);

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  headerText: {
    marginTop: 30,
    fontFamily: typography.light,
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: palette.greyScale11,
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderColor: '#000',
  },
  selected: {
    backgroundColor: palette.lightDark2,
  },
  selectedText4: { color: palette.white },
  text: {
    fontSize: 35,
    color: '#000',
    fontFamily: typography.arabRegular,
    textAlign: 'center',
  },
});
