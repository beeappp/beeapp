import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';

export const passExercise = createAsyncThunk<any, number>(
  'exercises/passExercise',
  async (id, { rejectWithValue }) => {
    try {
      const response = await baseService.get<any>(
        `/api/v1/exercise/${id}/pass`
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
