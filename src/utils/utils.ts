import { LanguageDetectorModule } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { getErrorMessage } from './getErrorMessage';
import { load, save } from './storage';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin: LanguageDetectorModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      // const isRussian =
      //   RNLocalize.getLocales()[0].languageCode.startsWith('ru');
      const language = await load(STORE_LANGUAGE_KEY);
      if (!language) {
        // return callback(isRussian ? 'ru' : 'kz');
        return callback('kz');
      } else {
        return callback(language);
      }
    } catch (error) {
      getErrorMessage(error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await save(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      getErrorMessage(error);
    }
  },
};

export { languageDetectorPlugin };

export const getAge = (date: string) => {
  return `${Math.floor(
    (Date.now() - new Date(date).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  )}`;
};
