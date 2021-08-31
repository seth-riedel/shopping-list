import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiBase } from '../env';

const initialState = {
  isFetching: false,
  data: [],
  addItemOpen: false,
};

export const fetchListData = createAsyncThunk(
  'list/fetchData',
  async () => {
    const response = await axios.get(`${apiBase}/item`);
    return response.data;
  },
);

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    toggleAddItemDrawer(state) {
      state.addItemOpen = !state.addItemOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchListData.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(fetchListData.rejected, (state) => {
        state.isFetching = false;
        state.error = 'Sorry, something went wrong. It\'s not you, it\'s us.';
      });
  },
});

export const {
  clearError,
  toggleAddItemDrawer,
} = listSlice.actions;

export default listSlice.reducer;
