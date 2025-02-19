import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import { QuestionRequest } from '../types';

export const answerQuestion = createAsyncThunk<any, QuestionRequest>(
  'question/answerQuestion',
  async (param, { rejectWithValue }) => {
    console.log('param', param);
    try {
      const response = await baseService.post<any>(
        '/api/v1/question/answer',
        param
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
