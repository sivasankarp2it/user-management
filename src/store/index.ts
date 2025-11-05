// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import tasksReducer from './slices/tasksSlice';

const load = () => {
  try {
    const s = localStorage.getItem('app_state');
    return s ? JSON.parse(s) : undefined;
  } catch {
    return undefined;
  }
};
const preloaded = load();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tasks: tasksReducer,
  },
  preloadedState: preloaded,
});

store.subscribe(() => {
  const s = store.getState();
  localStorage.setItem(
    'app_state',
    JSON.stringify({
      auth: s.auth,
      profile: s.profile,
      tasks: s.tasks,
    })
  );
});

export default store;