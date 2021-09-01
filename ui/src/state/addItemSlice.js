import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiBase } from '../env';
import { toggleAddItemDrawer, setListData } from './listSlice';

const initialState = {
  isSaving: false,
  error: null,
  formValues: {},
};

export const saveItem = createAsyncThunk(
  'addItem/save',
  async (params, { dispatch }) => {
    const response = await axios.post(`${apiBase}/item`, params);
    dispatch(toggleAddItemDrawer());
    dispatch(setListData(response.data));
    return response.data;
  },
);

export const addItemSlice = createSlice({
  name: 'addItem',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setFormValues(state, action) {
      state.formValues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveItem.pending, (state) => {
        state.error = null;
        state.isSaving = true;
      })
      .addCase(saveItem.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(saveItem.rejected, (state) => {
        state.isSaving = false;
        state.error = 'Unable to add/update item. Please try again later.';
      });
  },
});

export const {
  clearError,
  setError,
  setFormValues,
} = addItemSlice.actions;

export default addItemSlice.reducer;
