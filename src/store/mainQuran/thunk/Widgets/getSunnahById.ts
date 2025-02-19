import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../../init/axios/baseQuranService';

export const getSunnahById = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>('widgets/getSunnahById', async (daily_sunnah, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<any>(
      `/api/v1/widget/daily_sunnahs/${daily_sunnah}`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
