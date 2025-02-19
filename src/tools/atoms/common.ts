import { atom } from 'jotai';
import { atomWithMMKV } from './atomWithMMKV';
import { writeAtom, readAtom } from 'jotai-nexus';
import { NetInfoCellularGeneration } from '@react-native-community/netinfo';
import { AtomsKeysBook } from './types';
import { Surah, Verse, VersesByJuz } from '../../store/mainQuran/types';

//state atom
export const cellularGenerationAtom = atom<NetInfoCellularGeneration | null>(
  null
);
export const isInternetAvailableAtom = atom<boolean>(false);
export const isPlayingAudio = atom<boolean>(false);
export const isActiveWord = atom<string | null>(null);
export const pageNumber = atom<number>(0);
export const quranText = atom<Verse[] | VersesByJuz[]>([]);
export const chosenGrid = atom<string | null>(null);

//for storage save
export const ChoosenClassAtom = atomWithMMKV<number>(
  AtomsKeysBook.ChoosenClass,
  1
);
export const LastReadSurahAtom = atomWithMMKV<Surah[] | null>(
  AtomsKeysBook.LastReadSurahAtom,
  null
);

export const setAtomData = async (atom: any, data: any) => {
  writeAtom(atom, data);
};
export const readAtomData = async (atom: any) => {
  return await readAtom(atom);
};
export const removeAtomData = async (atom: any, location: string) => {
  writeAtom(atom, null);
};
