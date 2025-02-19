import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

function getItem(key: string): string | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

function removeItem(key: string): void {
  storage.delete(key);
}

function clearAll(): void {
  storage.clearAll();
}

export const atomWithMMKV = <T>(key: string, initialValue: T) => {
  const savedValue = getItem(key);
  return atomWithStorage<T>(
    key,
    (savedValue && JSON.parse(savedValue)) || initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    })),
  );
};
