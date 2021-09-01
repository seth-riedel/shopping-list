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

export const deleteItem = createAsyncThunk(
  'list/deleteItem',
  async (payload) => {
    const response = await axios.delete(`${apiBase}/item/${payload.id}`);
    return response.data;
  },
);

// pure function that needs a unit test
const updateItemInList = (data, id, updatedProps) => data.map((item) => {
  if (item.id === id) {
    return {
      ...item,
      ...updatedProps,
    };
  }

  return item;
});

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
    const pendingRequestHandler = (state) => {
      state.isFetching = true;
    };
    const fulfilledRequestHandler = (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    };
    const rejectedRequestHandler = (state) => {
      state.isFetching = false;
      state.error = 'Sorry, something went wrong. It\'s not you, it\'s us.';
    };

    builder
      .addCase(fetchListData.pending, pendingRequestHandler)
      .addCase(fetchListData.fulfilled, fulfilledRequestHandler)
      .addCase(fetchListData.rejected, rejectedRequestHandler);

    builder
      .addCase(deleteItem.pending, pendingRequestHandler)
      .addCase(deleteItem.fulfilled, fulfilledRequestHandler)
      .addCase(deleteItem.rejected, rejectedRequestHandler);

    builder
      .addCase(completeItem.pending, (state, action) => {
        // set fetching status on this specific item on state
        const idToComplete = action.meta.arg.id;
        state.data = updateItemInList(state.data, idToComplete, { isCompleting: true });
      })
      .addCase(completeItem.fulfilled, (state, action) => {
        // reset fetching status on this specific item on state
        const idToComplete = action.meta.arg.id;

        state.data = updateItemInList(state.data, idToComplete, {
          completed: action.meta.arg.complete,
          isCompleting: false,
        });
      })
      .addCase(completeItem.rejected, (state, action) => {
        // reset fetching status on this specific item on state
        const idToComplete = action.meta.arg.id;
        state.data = updateItemInList(state.data, idToComplete, { isCompleting: false });
      });
  },
});

export const {
  clearError,
  toggleAddItemDrawer,
  setListData,
} = listSlice.actions;

export default listSlice.reducer;
