import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// langs
import ru from './src/components/languages/ru';
import kz from './src/components/languages/kz';
import en from './src/components/languages/en';

// utils
import { languageDetectorPlugin } from './src/utils/utils';

const resources = {
  kz: {
    translation: kz,
  },
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
