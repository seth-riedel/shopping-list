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
    setListData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchListData.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
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
  setListData,
} = listSlice.actions;

export default listSlice.reducer;
