import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../../init/axios/baseQuranService';

export const storeRoles = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>('roles/storeRoles', async (name, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.post<any>('/api/v1/roles', name);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
