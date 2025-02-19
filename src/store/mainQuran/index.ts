import { useAppDispatch, useAppSelector } from '..';
import { quranActions } from './slice';
import { getAuthors } from './thunk/getAuthors';
import { getJuzs } from './thunk/getJuzs';
import { getJuzsBySurahsId } from './thunk/getJuzsBySurahsId';
import { getReciters } from './thunk/getReciters';
import { getSurahByReciter } from './thunk/getSurahByReciter';
import { getSurahs } from './thunk/getSurahs';
import { getUsers } from './thunk/getUsers';
import { getVerseAudio } from './thunk/getVerseAudio';
import { getVersesById } from './thunk/getVersesById';
import { getVersesByJuzs } from './thunk/getVersesByJuzs';
import { getVersesByPageNumber } from './thunk/getVersesByPageNumber';
import { getVersesBySurahId } from './thunk/getVersesBySurahId';
import { loginUser } from './thunk/loginUser';
import { registerUser } from './thunk/registerUser';
import {
  LoginRequest,
  RegisterRequest,
  SurahsRequest,
  VersesAudioRequest,
  VersesByIdRequest,
  VersesByJuzRequest,
  VersesBySurahIdRequest,
} from './types';

export const useMainQuran = () => {
  const dispatch = useAppDispatch();
  const setTotalPages = () => dispatch(quranActions.setTotalPages());

  return {
    isLoading: useAppSelector(({ mainQuran }) => mainQuran.isLoading),
    registerUser: async (registerData: RegisterRequest) =>
      dispatch(registerUser(registerData)).unwrap(),
    loginUser: async (loginData: LoginRequest) =>
      dispatch(loginUser(loginData)).unwrap(),
    getAuthors: async () => dispatch(getAuthors()).unwrap(),
    getUsers: async () => dispatch(getUsers()).unwrap(),
    getJuzs: async () => dispatch(getJuzs()).unwrap(),
    getJuzsBysSurahsId: async (juzNumber: number) =>
      dispatch(getJuzsBySurahsId(juzNumber)).unwrap(),
    getVersesBySurahId: async (params: VersesBySurahIdRequest) =>
      dispatch(getVersesBySurahId(params)).unwrap(),
    getVersesById: async (params: VersesByIdRequest) =>
      dispatch(getVersesById(params)).unwrap(),
    getVersesByJuzs: async (params: VersesByJuzRequest) =>
      dispatch(getVersesByJuzs(params)).unwrap(),
    getVerseAudio: async (params: VersesAudioRequest) =>
      dispatch(getVerseAudio(params)).unwrap(),
    getVersesByPageNumber: async (pageNumber: number) =>
      dispatch(getVersesByPageNumber(pageNumber)).unwrap(),
    getReciters: async () => dispatch(getReciters()).unwrap(),
    getSurahByReciter: async (reciterId: number) =>
      dispatch(getSurahByReciter(reciterId)).unwrap(),
    getSurahs: async (params?: SurahsRequest) =>
      dispatch(getSurahs(params)).unwrap(),
    surahs: useAppSelector(({ mainQuran }) => mainQuran.surahs),
    juzs: useAppSelector(({ mainQuran }) => mainQuran.juzs),
    versesBySurahId: useAppSelector(
      ({ mainQuran }) => mainQuran.versesBySurahId
    ),
    versesById: useAppSelector(({ mainQuran }) => mainQuran.versesById),
    totalPages: useAppSelector(({ mainQuran }) => mainQuran.totalpages),
    current_page: useAppSelector(({ mainQuran }) => mainQuran.current_page),
    setTotalPages,
  };
};
