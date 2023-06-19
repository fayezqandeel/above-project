import { configureStore } from '@reduxjs/toolkit';
import episodesReducer from './features/episodesSlice';

export const store = configureStore({
  reducer: {
    episodes: episodesReducer
  }
});
