import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Center, View } from '@gluestack-ui/themed';
import { Dimensions, TouchableOpacity } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

// styles
import styles from './styles';

// tools

// theme
import { palette } from '../../theme/palette';

//components
import Text from '../Text/Text';
import VideoIcon from '../../assets/icons/VideoIcon/Videoicon';
import PauseIcon from '../../assets/icons/PauseIcon/PauseIcon';

// assets

const { width } = Dimensions.get('window');

interface PlayerProps {
  videoID?: string;
  disabled?: boolean;
  // onEndVideo: () => void;
}

const VideoPlayer: FC<PlayerProps> = ({ videoID, disabled }) => {
  const videoRef = useRef<VideoRef>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const onLoad = useCallback(async () => {
    setTimeout(() => {
      setIsPaused(true);
    }, 500);
  }, []);

  const onEnd = useCallback(async () => {
    setTimeout(() => {
      // onEndVideo();
    }, 500);
  }, []);

  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      {isPlaying ? (
        <View borderRadius={20} overflow={'hidden'}>
          <Video
            onLoad={onLoad}
            onTouchStart={() => setIsPaused(prev => !prev)}
            paused={isPaused}
            source={{
              uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
            }}
            ref={videoRef}
            onEnd={onEnd}
            onError={e => console.log('Error:', e)}
            style={styles.backgroundVideo}
          />

          {isPaused && (
            <TouchableOpacity
              onPress={() => setIsPaused(prev => !prev)}
              style={{
                position: 'absolute',
                top: '45%',
                bottom: '50%',
                alignSelf: 'center',
              }}
            >
              <PauseIcon />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Center width={'$full'} mb={20}>
          <TouchableOpacity onPress={() => setIsPlaying(prev => !prev)}>
            <VideoIcon />
            <TouchableOpacity
              onPress={() => setIsPaused(prev => !prev)}
              style={{
                position: 'absolute',
                top: '40%',
                bottom: '15%',
                alignSelf: 'center',
              }}
            >
              <PauseIcon />
            </TouchableOpacity>
          </TouchableOpacity>
        </Center>
      )}
    </View>
  );
};
export default VideoPlayer;
