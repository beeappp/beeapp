import { View, VStack } from '@gluestack-ui/themed';
import Text from '../Text/Text';
import { typography } from '../../theme/typography';
import { Pressable, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { palette } from '../../theme/palette';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  item?: any;
  index?: number;
  openCorrect: () => void;
  openWrong: () => void;
}
const data2 = [
  { id: '0', text: 'бәәт', isCorrect: true },
  { id: '1', text: 'тәб', isCorrect: false },
  { id: '2', text: 'тәбә', isCorrect: false },
  { id: '3', text: 'бит', isCorrect: false },
];

const MultipleChoiceTranscript: FC<Props> = ({
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
    if (data2[id].isCorrect) {
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
      <Text style={styles.headerText}> {t('choose_correct')}</Text>

      <Text
        style={{
          fontFamily: typography.arabRegular,
          fontSize: 50,
          textAlign: 'center',
        }}
      >
        بَاتْ
      </Text>

      <View style={styles.container}>
        {data2.map(item => (
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

export default React.memo(MultipleChoiceTranscript);

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
    fontSize: 25,
    color: palette.lightDark2,
    textAlign: 'center',
    fontFamily: typography.regular,
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
