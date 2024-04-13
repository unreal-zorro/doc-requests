import { UserState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: UserState = {
  user: {
    id: '',
    username: '',
    isAuthenticated: false
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: { id: string; username: string } }) => {
      state.user.id = action.payload.id;
      state.user.username = action.payload.username;
      state.user.isAuthenticated = true;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
