// Core
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState } from '../../store';

// Types

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
