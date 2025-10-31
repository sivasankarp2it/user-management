import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  username: "",
  email: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state: any, action: { payload: any }) => {
      return { ...state, ...action.payload };
    },
    clearProfile: () => initialState,
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;