import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type MainQuranState = {
  isLoading: boolean;
  user: null;
  users: [];
  authors: [];
  juzsBySurahsId: [];
  versesBySurahId: [];
  versesById: Verse[];
  versesByPageNumber: [];
  verseAudio: [];
  reciters: [];
  surahByReciter: [];
  surahs: Surah[];
  juzs: JuzsItem[];
  totalpages: number;
  current_page: number;
};

// types.ts

export type LoginRequest = {
  phone: string;
  password: string;
};

export type RegisterRequest = {
  phone: string;
  password: string;
  password_confirmation: string;
  name: string;
  surname: string;
  secret_word: boolean;
};

export type VersesBySurahIdRequest = {
  surah_id: number;
  words?: 'true' | 'false';
};

export type VersesAudioRequest = {
  verse_id: number;
  words?: boolean;
};

export type VersesByIdRequest = {
  page?: number;
  id: number;
  words?: 'true' | 'false';
  author?: number;
  translations?: 'true' | 'false';
};

export type VersesByJuzRequest = {
  page?: number;
  juz: number;
  surah: number;
  words?: 'true' | 'false';
  author?: number;
  translations?: 'true' | 'false';
};

export type SurahsRequest = {
  sort_by?: 'desc' | 'asc';
  revelation_place?: 'madinah' | 'makkah';
  verse_key?: string; //example (1:3)
};

export type SurahResponse = {
  message: string;
  data: Surah[];
};

export type Surah = {
  id: number;
  revelation_place: string;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  translated_name: string;
  page_from: number;
  page_to: number;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type SurahOfJuz = {
  surah_id: number;
  revelation_place: string;
  name_simple: string;
  name_arabic: string;
  translated_name: string;
  page_from: number;
  page_to: number;
  first_verse_id: number;
  last_verse_id: number;
};

export type VerseResponse = {
  message: string;
  data: JuzsItem[];
};

export type JuzsItem = {
  id: number;
  verses_count: number;
  first_verse_id: number;
  last_verse_id: number;
  surahs: SurahOfJuz[];
};

export type SurahByVerse = {
  id: number;
  revelation_place: string;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  translated_name: string;
  page_from: number;
  page_to: number;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
};

export type Pivot = {
  juz_id: number;
  surah_id: number;
};

export type VersesResponse = {
  message: string;
  data: Verse[];
  last_page: number;
  current_page: number;
};

export type Verse = {
  id: number;
  surah_id: number;
  page_id: number;
  verse_key: string;
  text_uthmani: string;
  text_imlaei: string;
  created_at: string;
  updated_at: string;
  words: VerseWord[];
  translations: Translation[];
};

export type VerseWord = {
  id: number;
  verse_id: number;
  audio_url: string;
  position: number;
  location: string;
  text: string;
  created_at: string;
  updated_at: string;
  transliterations: Transliteration[];
  translations: any[];
};

export type Transliteration = {
  id: number;
  word_id: number;
  text: string;
  created_at: string;
  updated_at: string;
  type: number;
};

export type Translation = {
  id: number;
  translateable_id: number;
  translateable_type: string;
  author_id: number;
  language_id: number;
  text: string;
  created_at: string;
  updated_at: string;
};

export type QuranVerseResponse = {
  message: string;
  data: Verse[];
};

export type QuranVerse = {
  id: number;
  text: string;
  transliterations: string;
  translations: string;
  words: { [key: string]: string };
};

export type Translations = {
  id: number;
  translateable_id: number;
  translateable_type: string;
  author_id: number;
  language_id: number;
  text: string;
  created_at: string;
  updated_at: string;
};

export type Words = {
  id: number;
  verse_id: number;
  audio_url: string;
  position: number;
  location: string;
  text: string;
  created_at: string;
  updated_at: string;
  transliterations: Transliteration[];
  translations: any[];
};

export type VersesByJuz = {
  id: number;
  surah_id: number;
  page_id: number;
  verse_key: string;
  text_uthmani: string;
  text_imlaei: string;
  words: Words[];
  translations: Translations[];
};

export type VersesByJuzResponse = {
  current_page: number;
  data: VersesByJuz[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<
  MainQuranState,
  PayloadAction<T>
>;
