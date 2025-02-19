import { View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import SoundIcon from '../../assets/icons/Sound/SoundIcon';
import { Pressable, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC, useCallback, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useTranslation } from 'react-i18next';

interface Props {
  item?: any;
  index?: number;
  openCorrect: () => void;
  openWrong: () => void;
}

const data = [
  { id: '0', text: 'بَاتَ', isCorrect: true },
  { id: '1', text: 'تَبَ', isCorrect: false },
  { id: '2', text: 'تَابَ', isCorrect: false },
  { id: '3', text: 'تَبَّتْ', isCorrect: false },
];

const MultipleChoiceAudio: FC<Props> = ({
  item,
  index,
  openCorrect,
  openWrong,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handlePress = useCallback(async (id: string, isCorrect: boolean) => {
    setSelectedId(id);
  }, []);

  const SubmitPress = useCallback(async (id: any) => {
    if (data[id].isCorrect) {
      openCorrect();
    } else {
      openWrong();
    }
  }, []);
  return (
    <VStack
      width={'100%'}
      height={'100%'}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <VStack>
        <Text style={styles.headerText}>{t('video_exercise')}</Text>
        <VideoPlayer />
      </VStack>

      <View style={styles.container}>
        {data.map(item => (
          <Pressable
            key={item.id}
            onPress={() => handlePress(item.id, item.isCorrect)}
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
              {item.text}
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
          SubmitPress(selectedId);
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
    marginTop: 30,
    marginBottom: 15,
    fontFamily: typography.light,
    fontSize: 20,
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
