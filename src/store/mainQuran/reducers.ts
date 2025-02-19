import * as types from './types';

export const setTotalPages = (state: types.MainQuranState) => {
  return {
    ...state,
    totalpages: 1,
  };
};
