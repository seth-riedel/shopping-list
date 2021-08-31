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

export const completeItem = createAsyncThunk(
  'list/completeItem',
  async (payload) => {
    await axios.post(`${apiBase}/item/complete`, payload);
    return true;
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

    builder
      .addCase(completeItem.pending, (state, action) => {
        // set fetching status on this specific item on state
        const idToComplete = action.meta.arg.id;
        state.data = state.data.map((item) => {
          if (item.id === idToComplete) {
            return {
              ...item,
              isCompleting: true,
            };
          }

          return item;
        });
      })
      .addCase(completeItem.fulfilled, (state, action) => {
        // reset fetching status on this specific item on state
        const idToComplete = action.meta.arg.id;
        state.data = state.data.map((item) => {
          if (item.id === idToComplete) {
            return {
              ...item,
              completed: action.meta.arg.completed,
              isCompleting: false,
            };
          }

          return item;
        });
      })
      .addCase(completeItem.rejected, (state, action) => {
        // reset fetching status on this specific item on state
        const idToComplete = action.meta.arg.id;
        state.data = state.data.map((item) => {
          if (item.id === idToComplete) {
            return {
              ...item,
              isCompleting: false,
            };
          }

          return item;
        });
      });
  },
});

export const {
  clearError,
  toggleAddItemDrawer,
  setListData,
} = listSlice.actions;

export default listSlice.reducer;
