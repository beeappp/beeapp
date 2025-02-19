import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../../init/axios/baseQuranService';

export const getPermissions = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>('permissions/getPermissions', async (id, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.delete<any>(
      `/api/v1/permissions/${id}`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
