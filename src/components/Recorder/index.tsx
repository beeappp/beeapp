import React, { memo, useCallback, useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MicrophoneIcon from '../../assets/icons/Microphone/MicrophoneIcon';
import { View } from '@gluestack-ui/themed';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CIRCLE_LENGTH = 2 * Math.PI * 52.5;

interface RecorderProps {
  startedRecord: () => Promise<void>;
  stopRecord: () => Promise<
    { base64: string; sampleRate: string | null } | undefined
  >;

  stopRecording: (audio64: string, sampleRate: string | null) => Promise<void>;
  recordDuration: number;
}

const Recorder: React.FC<RecorderProps> = ({
  startedRecord,
  stopRecord,
  stopRecording,
  recordDuration,
}) => {
  const progress = useSharedValue(0);

  const onStopRecord = useCallback(async () => {
    if (stopRecord) {
      const data = await stopRecord();
      if (data) stopRecording(data.base64, data.sampleRate);
    }
  }, []);

  useEffect(() => {
    startedRecord();

    progress.value = withTiming(1, {
      duration: recordDuration,
      easing: Easing.linear,
    });
  }, [recordDuration]);

  useAnimatedReaction(
    () => progress.value,
    currentProgress => {
      if (currentProgress === 1) {
        runOnJS(onStopRecord)();
      }
    }
  );

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  return (
    <View alignItems="center" justifyContent="center">
      <MicrophoneIcon />

      <View position="absolute">
        <Svg width={108} height={108} fill="none">
          <Circle
            cx={54}
            cy={54}
            r={52.5}
            stroke="#C6C6C6"
            strokeOpacity={0.3}
            strokeWidth={3}
          />
          <AnimatedCircle
            cx={54}
            cy={54}
            r={52.5}
            stroke="#434343"
            strokeWidth={3}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin="54, 54"
          />
        </Svg>
      </View>
    </View>
  );
};

export default memo(Recorder);
