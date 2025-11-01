// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

// ✅ Example hardcoded users (simulate a real API)
const USERS = [
  { username: "admin", password: "password", role: "admin" },
  { username: "manager", password: "password", role: "manager" },
  { username: "employee", password: "password", role: "employee" },
];

const initialState = {
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
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

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// ✅ Handle login by checking role
export const login = (username, password) => {
  return (dispatch) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const token = "mock-token-" + Date.now();
      dispatch(
        loginSuccess({
          user: { username: found.username, role: found.role },
          token,
        })
      );
    } else {
      dispatch(loginFailure("Invalid credentials"));
    }
  };
};

export default authSlice.reducer;