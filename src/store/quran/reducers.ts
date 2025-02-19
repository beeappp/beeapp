import * as types from './types';

export const setTranslText: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    translText: action.payload,
  };
};

export const setRuText: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    ruText: action.payload,
  };
};

export const setKzText: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    kzText: action.payload,
  };
};

export const setArabText: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    arabText: action.payload,
  };
};
