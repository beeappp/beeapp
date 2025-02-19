import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Storage, persistReducer, persistStore } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import user from '../store/user/slice';
import courses from '../store/courses/slice';
import exercises from '../store/exercise/slice';
import lesson from '../store/lesson/slice';
import question from '../store/question/slice';
import onboarding from '../store/onboarding/slice';
import quran from '../store/quran/slice';
import mainQuran from './mainQuran/slice';

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

// Configure Redux Persist with the custom storage engine
const persistConfig = {
  timeout: 1500,
  key: 'root',
  storage: reduxStorage,
  whitelist: ['user'],
};

// Combine reducers
const combinedReducers = combineReducers({
  user,
  courses,
  exercises,
  lesson,
  question,
  onboarding,
  quran,
  mainQuran,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor };
