import * as types from './types';

export const removeUserDetails = (state: types.UserState) => {
  return {
    ...state,
    user: null,
    isAuthorized: false,
  };
};

export const setAuthorize: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    isAuthorized: action.payload,
  };
};
