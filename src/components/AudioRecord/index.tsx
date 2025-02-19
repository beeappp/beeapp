import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { DocumentDirectoryPath } from 'react-native-fs';
import { isPlayingAudio } from '../../tools/atoms/common';
import { getAudioSampleRate } from '../../utils/getSample';

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

const path = Platform.select({
  ios: 'hello.wav',
  android: `${DocumentDirectoryPath}/hello.wav`,
});

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAudio);

  const justClose = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      justClose();
    };
  }, []);

  const onStartRecord = async () => {
    try {
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVModeIOS: AVModeIOSOption.measurement,
        AVNumberOfChannelsKeyIOS: 1,
        AVFormatIDKeyIOS: AVEncodingOption.wav,
        AudioSamplingRateAndroid: 22050,
        AVSampleRateKeyIOS: 22050,
        AudioChannelsAndroid: 1,
      };
      const meteringEnabled = false;

      const uri = await audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled
      );
      audioRecorderPlayer.addRecordBackListener(e => {
        console.log('Recording . . . ', e.currentPosition);
      });
      setIsRecording(true);
      console.log(uri);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);

      const sampleRate = await getAudioSampleRate(result);

      const base64 = await RNFS.readFile(result, 'base64');

      return { base64, sampleRate };
    } catch (error) {
      console.error('Error stopping the recording:', error);
    }
  };

  const onStartPlay = async (url: string) => {
    console.log('onStartPlay');
    await audioRecorderPlayer.startPlayer(url);
    audioRecorderPlayer.addPlayBackListener(e => {
      // You can use this callback to update UI with playback progress
      // console.log('Playing . . . ', e.currentPosition);
      if (e.currentPosition === e.duration || e.currentPosition > e.duration) {
        // console.log(e.duration, e.currentPosition);
        // console.log('finished');
        audioRecorderPlayer.stopPlayer();
        setIsPlaying(false);
      }
    });
    setIsPlaying(true);
  };

  // const onStopPlay = async () => {
  //   console.log('onStopPlay');
  //   audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  //   setIsPlaying(false);
  // };

  return {
    isPlaying,
    isRecording,
    onStartRecord,
    onStopRecord,
    onStartPlay,
    // audio64,
    // sampleRate,
    // onStartPlay,
    // onStopPlay,
  };
};

export default AudioRecorder;
