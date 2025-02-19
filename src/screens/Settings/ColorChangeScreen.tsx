import { View, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Layout } from '../../navigator/Layout';
import TabHeader from '../../components/TabHeader';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../components/Text/Text';
import TickIcon from '../../assets/icons/Settings/ColorChangeScreen/TickIcon';
import { useTranslation } from 'react-i18next';

const ColorChangeScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>('1');

  const options = [
    { id: '1', label: t('open_color') },
    { id: '2', label: t('black_color') },
    { id: '3', label: t('system_color') },
  ];

  const renderItem = ({ item }: { item: { id: string; label: string } }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => setSelectedId(item.id)}
      >
        <Text style={styles.label}>{item.label}</Text>
        {isSelected && <TickIcon />}
      </TouchableOpacity>
    );
  };
  return (
    <Layout bottom top padding>
      <VStack flex={1}>
        <TabHeader
          variant={'leftArrow'}
          gradient={palette.arrowGradient2}
          headerScreenTitle={t('setting_color')}
          textStyle={{
            fontFamily: typography.medium,
            fontSize: 20,
            color: palette.lightDark,
            textAlign: 'center',
            lineHeight: 25,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View borderRadius={20} overflow="hidden" mt={15}>
          <FlatList
            data={options}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </VStack>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: 20,
    borderRadius: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    color: palette.lightDark,
    fontFamily: typography.medium,
    marginLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 15,
  },
});

export default ColorChangeScreen;
