import React, { FC, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { HStack, Text, View, VStack } from '@gluestack-ui/themed';
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

interface Props {
  item: Verse;
}

const QuranTextItem: FC<Props> = ({ item }) => {
  const { Popover } = renderers;

  //settings
  const { translText, ruText, kzText, arabText } = useQuran();
  const [activeTrigger, setActiveTrigger] = useAtom<string | null>(
    isActiveWord
  );
  const { onStartPlay, isPlaying } = AudioRecorder();

  const handleMenuPress = useCallback((id: string, url: string) => {
    setActiveTrigger(id);
    onStartPlay(url);
  }, []);

  const fullTransliteration = item.words
    .reduce((acc, word) => {
      if (word.transliterations[0].text) {
        acc += word.transliterations[0].text + ' ';
      }
      return acc;
    }, '')
    .trim();

  return (
    <VStack key={item.verse_key}>
      <HStack style={styles.verseWrapper}>
        {arabText &&
          item.words.map((word, wordIndex) => {
            return word.transliterations[0].text != '' ? (
              <Menu
                key={`${item.id}_${wordIndex}`}
                renderer={Popover}
                rendererProps={{
                  preferredPlacement: 'top',
                  anchorStyle: { backgroundColor: palette.brownGrey },
                }}
              >
                <MenuTrigger
                  disabled={isPlaying}
                  onPress={() =>
                    handleMenuPress(`${item.id}_${wordIndex}`, word.audio_url)
                  }
                  customStyles={{
                    triggerTouchable: { underlayColor: 'transparent' },
                  }}
                >
                  <Text
                    style={[
                      styles.verseText,
                      activeTrigger === `${item.id}_${wordIndex}` &&
                        isPlaying &&
                        styles.activeVerseText,
                    ]}
                  >
                    {word.text}{' '}
                  </Text>
                </MenuTrigger>

                <MenuOptions
                  customStyles={{ optionsContainer: styles.optionsContainer }}
                >
                  <MenuOption onSelect={() => {}}>
                    <View style={styles.translationContainer}>
                      <Text style={styles.translationText}>
                        {word.transliterations[0].text}
                      </Text>
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            ) : (
              <Text key={`${item.id}_${wordIndex}`} style={[styles.verseText]}>
                {}
              </Text>
            );
          })}
      </HStack>
      {item.translations && (translText || ruText || kzText) && (
        <VStack marginVertical={14} gap={5}>
          {translText && (
            <Text style={[styles.transText]}>{fullTransliteration}</Text>
          )}
          {kzText && (
            <Text style={[styles.textRu]}>{item.translations[0].text}</Text>
          )}

          {/* {ruText && <Text style={[styles.textRu]}>{item.ruText}</Text>} */}
        </VStack>
      )}

      <HStack alignItems="center">
        <SmallListGridicon roundNumber={`${item.verse_key}`} />
        <HStack w={'100%'} height={0.5} bgColor={palette.divider} />
      </HStack>
    </VStack>
  );
};

export default React.memo(QuranTextItem);

const styles = StyleSheet.create({
  verseText: {
    fontSize: 28,
    fontFamily: typography.arabRegular,
    color: 'black',
    textAlign: 'right',
  },
  transText: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: typography.regular,
    textAlign: 'left',
    color: '#8A898E',
  },
  textRu: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: typography.regular,
    textAlign: 'left',
    color: '#121212',
  },
  textKZ: {},
  translationContainer: {
    width: 165,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  translationText: {
    fontFamily: typography.light,
    fontSize: 16,
    color: palette.white,
    textAlign: 'center',
  },
  activeVerseText: {
    color: palette.blue,
    fontWeight: 'bold',
  },
  verseWrapper: {
    flexWrap: 'wrap',
    // justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  },
  optionsContainer: {
    padding: 0,
    backgroundColor: palette.brownGrey,
    borderRadius: 8,
  },
  arrowContainer: {
    alignItems: 'center',
    marginTop: -1,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#4a4a4a',
  },
});
