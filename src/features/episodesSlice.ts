/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createSlice } from '@reduxjs/toolkit';
import { type Episode } from '../types/episode';

const initialState: {
  list: Episode[]
  notification: boolean | string
} = {
  list: [],
  notification: false
};

export const EpisodesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAllAction: (state, action) => {
      state.list = action.payload;
    },
    addAction: (state, action) => {
      state.list = [...state.list, action.payload];
      state.notification = `the episode ${action.payload.title} was added`;
    },
    deleteAction: (state, action) => {
      state.list = state.list.filter(
        item => item.id !== action.payload
      );
      state.notification = `the episode was deleted ${action.payload}`;
    },
    editAction: (state, action) => {
      state.list = state.list.map(
        item => item.id === action.payload.id
          ? action.payload
          : item
      );
      state.notification = `the episode ${action.payload.title} was updated!`;
    },
    resetNotificationAction: (state) => {
      state.notification = false;
    }
  }
});

export const { setAllAction, addAction, deleteAction, editAction, resetNotificationAction } = EpisodesSlice.actions;

export default EpisodesSlice.reducer;
