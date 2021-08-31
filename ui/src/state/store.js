import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listSlice';
import addItemReducer from './addItemSlice';

export const store = configureStore({
  reducer: {
    list: listReducer,
    addItem: addItemReducer,
  },
});

export default store;
