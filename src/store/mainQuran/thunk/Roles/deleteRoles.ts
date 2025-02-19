import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../../init/axios/baseQuranService';

export const getRole = createAsyncThunk<any, number, { rejectValue: string }>(
  'roles/getRole',
  async (id, { rejectWithValue }) => {
    try {
      const response = await baseQuranService.delete<any>(
        `/api/v1/roles/${id}`
      );
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);
