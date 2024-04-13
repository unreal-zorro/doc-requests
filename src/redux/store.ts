import { configureStore, type Store } from '@reduxjs/toolkit';
import { userReducer } from './slice';
import { UserState } from '@/types';

export function createReduxStore(initialState: UserState): Store {
  return configureStore<UserState>({
    reducer: userReducer,
    preloadedState: initialState
  });
}
