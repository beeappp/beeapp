import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export async function load(key: string): Promise<any | null> {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

export async function save<T>(key: string, value: T): Promise<void> {
  storage.set(key, JSON.stringify(value));
}

export async function remove(key: string): Promise<void> {
  storage.delete(key);
}

export async function clearAll(): Promise<void> {
  storage.clearAll();
}
