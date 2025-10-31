// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const HARDCODED = { username: 'admin', password: 'password' };

const initialState = {
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = slice.actions;

export const login = (username, password) => {
  return (dispatch) => {
    if (username === HARDCODED.username && password === HARDCODED.password) {
      const token = 'mock-token-' + Date.now();
      dispatch(loginSuccess({ user: { username }, token }));
    } else {
      dispatch(loginFailure('Invalid credentials'));
    }
  };
};

export default slice.reducer;