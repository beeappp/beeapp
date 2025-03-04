import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { UserState } from '../types';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
import { resendValidation } from './resendValidation';
import { verifyCode } from './verifyCode';
import { deleteUser } from './deleteUser';

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addMatcher(
    isAnyOf(
      registerUser.pending,
      loginUser.pending,
      resendValidation.pending,
      verifyCode.pending,
      deleteUser.pending
    ),
    state => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(isAnyOf(registerUser.fulfilled), (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  });

  builder.addMatcher(isAnyOf(loginUser.fulfilled), (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  });
  builder.addMatcher(isAnyOf(resendValidation.fulfilled), (state, action) => {
    state.isLoading = false;
  });
  builder.addMatcher(isAnyOf(deleteUser.fulfilled), state => {
    state.isLoading = false;
  });
  builder.addMatcher(isAnyOf(verifyCode.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(
    isAnyOf(
      registerUser.rejected,
      loginUser.rejected,
      resendValidation.rejected,
      verifyCode.rejected,
      deleteUser.rejected
    ),
    state => {
      state.isLoading = false;
    }
  );
};
