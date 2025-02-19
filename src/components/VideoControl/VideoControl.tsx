import React, { FC, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { HStack, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import SmallListGridicon from '../../assets/icons/ReadKuran/SmallListGridIcon';
import { Verse } from '../../store/mainQuran/types';
import { useQuran } from '../../store/quran';
import AudioRecorder from '../AudioRecord';
import { useAtom } from 'jotai';
import { isActiveWord } from '../../tools/atoms/common';
import RewindIcon from '../../assets/icons/VideoControl/RewindIcon';
import PlayPauseIcon from '../../assets/icons/VideoControl/PlayPauseIcon';
import FastForwardIcon from '../../assets/icons/VideoControl/FastForwardIcon';
import * as Progress from 'react-native-progress';

interface Props {
  closeControlPage: () => void;
  handleRewind: () => void;
  handleFastForward: () => void;
  handlePause: () => void;
  duration: number;
  currentTime: number;
}

const VideoControl: FC<Props> = ({
  currentTime,
  duration,
  closeControlPage,
  handleRewind,
  handleFastForward,
  handlePause,
}) => {
  return (
    <Pressable onPress={closeControlPage} style={styles.container}>
      <VStack style={styles.column}>
        <HStack style={styles.controlRow}>
          <Pressable onPress={handleRewind}>
            <RewindIcon />
          </Pressable>
          <Pressable onPress={handlePause}>
            <PlayPauseIcon />
          </Pressable>
          <Pressable onPress={handleFastForward}>
            <FastForwardIcon />
          </Pressable>
        </HStack>
        <View width={'75%'}>
          <Progress.Bar
            progress={duration ? currentTime / duration : 0}
            width={null}
            borderRadius={20}
            height={4}
            color={palette.white}
            unfilledColor={'#878B8E'}
          />
        </View>
      </VStack>
    </Pressable>
  );
};

export default React.memo(VideoControl);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: palette.opacityBlack,
    zIndex: 999,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  column: {
    width: '100%',
    bottom: 100,
    gap: 50,
    alignItems: 'center',
  },
  controlRow: {
    width: '100%',
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
