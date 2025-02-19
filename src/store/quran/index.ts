import { useAppDispatch, useAppSelector } from '..';
import { quranActions } from './slice';

export const useQuran = () => {
  const dispatch = useAppDispatch();

  const setTranslText = (state: boolean) =>
    dispatch(quranActions.setTranslText(state));
  const setRuText = (state: boolean) => dispatch(quranActions.setRuText(state));
  const setKzText = (state: boolean) => dispatch(quranActions.setKzText(state));
  const setArabText = (state: boolean) =>
    dispatch(quranActions.setArabText(state));

  return {
    isLoading: useAppSelector(({ quran }) => quran.isLoading),
    translation: useAppSelector(({ quran }) => quran.translation),
    translText: useAppSelector(({ quran }) => quran.translText),
    ruText: useAppSelector(({ quran }) => quran.ruText),
    kzText: useAppSelector(({ quran }) => quran.kzText),
    arabText: useAppSelector(({ quran }) => quran.arabText),
    setTranslText,
    setRuText,
    setKzText,
    setArabText,
  };
};
