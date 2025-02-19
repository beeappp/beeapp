import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../../init/axios/baseQuranService';

export const updatePermissions = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>('permissions/updatePermissions', async (name, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.put<any>(
      '/api/v1/permissions',
      name
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
