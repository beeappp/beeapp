import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import { Layout } from '../../navigator/Layout';
import { HStack, VStack } from '@gluestack-ui/themed';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import TabHeader from '../../components/TabHeader';
import { useNavigation } from '@react-navigation/native';
import { useQuran } from '../../store/quran';
import { useTranslation } from 'react-i18next';

const KuranSettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const {
    setTranslText,
    setRuText,
    translText,
    ruText,
    setKzText,
    kzText,
    arabText,
    setArabText,
  } = useQuran();

  const settingsData = [
    // { label: t('tezhuid'), value: false, distance: true },
    { label: t('arabic'), value: arabText },
    { label: t('trans_text'), value: translText },
    { label: t('kz_text'), value: kzText },
    // { label: t('ru_text'), value: ruText },
  ];
  const [settings, setSettings] = useState(settingsData);

  const toggleSetting = (index: number) => {
    setSettings(prevSettings => {
      const updatedSettings = [...prevSettings];
      const newValue = !updatedSettings[index].value;
      updatedSettings[index].value = newValue;
      console.log(index);
      if (index === 0) setArabText(newValue);
      if (index === 1) setTranslText(newValue);
      if (index == 2) setKzText(newValue);
      // if (index === 4) setRuText(newValue);

      return updatedSettings;
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <HStack
      style={[
        styles.settingItem,
        {
          marginBottom: index === 0 ? 15 : undefined,
          borderRadius: index === 0 ? 20 : undefined,
          borderTopRightRadius: index === 1 ? 20 : undefined,
          borderTopLeftRadius: index === 1 ? 20 : undefined,
          borderBottomRightRadius: index === 2 ? 20 : undefined,
          borderBottomLeftRadius: index === 2 ? 20 : undefined,
          borderBottomWidth: index !== 0 && index !== 2 ? 0.5 : undefined,
          borderBottomColor: palette.divider,
        },
      ]}
    >
      <Text style={styles.settingLabel}>{item.label}</Text>
      <Switch
        value={item.value}
        onValueChange={() => toggleSetting(index)}
        trackColor={{ false: '#767577', true: 'black' }}
        thumbColor={item.value ? palette.white : palette.brownGrey}
      />
    </HStack>
  );

  return (
    <Layout top padding>
      <View style={styles.container}>
        <TabHeader
          variant={'leftArrow'}
          onPress={() => {
            navigation.goBack();
          }}
          headerStyle={{ alignItems: 'center', marginBottom: 20 }}
          headerScreenTitle="Құран параметрлері"
          textStyle={styles.headerText}
          gradient={palette.arrowGradient2}
        />
        <FlatList
          data={settings}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: { width: '100%', alignItems: 'center', marginBottom: 20 },
  headerText: {
    color: palette.black,
    fontFamily: typography.medium,
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
  },
  settingItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: palette.white,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: typography.medium,
    color: palette.lightDark,
  },
});

export default KuranSettingsScreen;
