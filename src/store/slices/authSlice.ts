// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

// ✅ Example hardcoded users (simulating database)
const USERS = [
  { username: "admin", password: "password", role: "admin"},
  { username: "manager1", password: "password", role: "manager" },
  { username: "manager2", password: "12345", role: "manager" },
  { username: "employee1", password: "password", role: "employee" },
  { username: "employee2", password: "password", role: "employee" },
  { username: "employee3", password: "12345", role: "employee" },
  { username: "hr1", password: "password", role: "hr" },
  { username: "developer1", password: "password", role: "developer" },
  { username: "developer2", password: "password", role: "developer" },
  { username: "inactiveUser", password: "password", role: "employee", active: false },
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

// ✅ Role-based login simulation
export const login = (username, password) => {
  return (dispatch) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );

    // Handle login errors
    if (!found) {
      dispatch(loginFailure("Invalid username or password"));
      return;
    }

    if (found.active === false) {
      dispatch(loginFailure("Your account is inactive. Contact admin."));
      return;
    }

    const token = "mock-token-" + Date.now();

    // Dispatch login success with role info
    dispatch(
      loginSuccess({
        user: {
          username: found.username,
          role: found.role,
        },
        token,
      })
    );
  };
};

export default authSlice.reducer;