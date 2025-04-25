import React, { FC, useEffect, useRef, useState } from 'react';
import { Spinner, View } from '@gluestack-ui/themed';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

//components
import Text from '../Text/Text';
import { VideoPlayerRef } from 'react-native-video-player';

import Slider from '@react-native-community/slider';
import Video, {
  OnLoadData,
  OnPlaybackStateChangedData,
  OnProgressData,
  ResizeMode,
} from 'react-native-video';
import PlayPauseIcon from '../../assets/icons/VideoControl/PlayPauseIcon';
import RewindIcon from '../../assets/icons/VideoControl/RewindIcon';
import FastForwardIcon from '../../assets/icons/VideoControl/FastForwardIcon';
import PauseIcon from '../../assets/icons/VideoControl/PauseIcon';
import { DimensionValue } from 'react-native';
import { G } from 'react-native-svg';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface PlayerProps {
  videoUrl?: string;
  resizeMode?: ResizeMode;
  onProgress?: (event: OnProgressData) => void;
  onEnd?: () => void;
  fullSize?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  controlsBottom?: number;
  thumbnailUrl?: string;
  endWithThumbnail?: boolean;
  autoplay?: boolean;
  disabledLayout?: boolean;
  controlsRef?: any;
  onPlaybackStateChanged?: (e: OnPlaybackStateChangedData) => void;
}

const ExerciseVideoPlayer: FC<PlayerProps> = ({
  videoUrl,
  onProgress,
  onEnd,
  resizeMode = ResizeMode.COVER,
  fullSize,
  width,
  height,
  controlsBottom,
  autoplay = true,
  disabledLayout,
  controlsRef,
  onPlaybackStateChanged,
}) => {
  const playerRef = useRef<VideoPlayerRef>(null);

  const [duration, setDuration] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const opacity = useSharedValue(0);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const resume = () => {
    if (playerRef.current) {
      playerRef.current?.resume?.();
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current?.pause?.();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      controlsRef.current = playerRef.current;
    }
  }, [playerRef.current]);

  const onLoad = (e: OnLoadData) => {
    setDuration(e.duration);
    setInitialized(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleEnd = () => {
    setHasEnded(true);
  };

  const handleProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
    if (onProgress) {
      onProgress(data);
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current?.seek(time);
      setCurrentTime(time);
    }
  };

  const resetOpacity = () => {
    opacity.value = withTiming(0, { duration: 200 });
  };

  const handlePressIn = async ({ force }: { force?: boolean }) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    if (opacity.value && force) {
      console.log('force', force);
      resetOpacity();
    } else {
      if (!disabledLayout) {
        opacity.value = withTiming(1, { duration: 200 });
      }
    }
    if (hasEnded) {
      handlePressOut();
      handleSeek(0);
      setHasEnded(false);
      resume();
    }
  };

  const handlePressOut = async () => {
    timeoutId.current = setTimeout(() => {
      resetOpacity();
    }, 3000);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
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
      <Pressable
        onPressIn={() => {
          handlePressIn({ force: true });
        }}
        onPressOut={handlePressOut}
        style={[
          { zIndex: 0, height, width },
          fullSize && {
            width: windowWidth,
            height: windowHeight,
          },
        ]}
        disabled={false}
      >
        <View pointerEvents="none">
          <Video
            ref={playerRef}
            paused={!autoplay}
            source={{
              uri: videoUrl,
            }}
            onLoad={onLoad}
            onProgress={handleProgress}
            onEnd={handleEnd}
            onError={e => console.log('eer', e)}
            onPlaybackStateChanged={e => {
              setIsPlaying(e.isPlaying);
              onPlaybackStateChanged?.(e);
            }}
            style={[
              {
                height,
                width,
              },
              fullSize && {
                width: width || windowWidth,
                height: height || windowHeight,
              },
            ]}
            resizeMode={resizeMode}
            controlsStyles={{ hideFullscreen: true }}
            // customStyles={{
            //   controls: { display: 'none' },
            //   seekBar: { display: 'none' },
            // }}
          />
          <Animated.View
            style={[
              {
                width: width || '100%',
                height: height || '100%',
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              animatedStyle,
              fullSize && {
                width: width || windowWidth,
                height: height || windowHeight,
              },
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.controls,
            !!controlsBottom && { bottom: controlsBottom },
            animatedStyle,
          ]}
          pointerEvents="box-none"
        >
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPressIn={() => {
                handlePressIn({}).then(() => {
                  handlePlayPause();
                });
              }}
              onPressOut={handlePressOut}
              style={styles.controlButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {!isPlaying ? <PlayPauseIcon /> : <PauseIcon />}
            </TouchableOpacity>
          </View>

          <View style={styles.progressBar} />
        </Animated.View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: 'black' },
  videoContainer: { flex: 1, justifyContent: 'center' },
  video: { width: '100%', height: '100%' },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    zIndex: 99,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 30,
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  buttonText: { fontSize: 18, color: 'white' },
  progressBar: { width: '100%', height: 40 },
  timeText: { color: 'white', textAlign: 'center', marginTop: 5 },
});

export default ExerciseVideoPlayer;
