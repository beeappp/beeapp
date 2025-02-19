import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../../init/axios/baseQuranService';

export const getDikhrById = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>('widgets/getDikhrById', async (dikhr, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<any>(
      `/api/v1/widget/dikhrs/${dikhr}`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
