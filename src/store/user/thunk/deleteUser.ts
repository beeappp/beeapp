import { createAsyncThunk } from '@reduxjs/toolkit';
// import { LoginRequest, LoginResponse, UserData } from '../types';
import baseService from '../../../init/axios/baseService';

export const deleteUser = createAsyncThunk(
  'auth/delete',
  async ({ userId }: { userId: number }, { rejectWithValue }) => {
    try {
      const response = await baseService.delete(
        `/api/v1/auth/${userId}/delete/account`
      );
      // const { token, user } = response.data.data;
      // console.log('response', response);
      // save(accessToken, token);
      // setAuthHeader(token);
      // return user;
      console.log('response', response);
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Invalid credentials.');
    }
  }
);
