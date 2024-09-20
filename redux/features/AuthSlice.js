import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authOpen: true,
  },
  reducers: {
    setAuthOpen: (state, action) => {
      state.authOpen = action.payload;
    },
  },
});

export const { setAuthOpen } = authSlice.actions;
export default authSlice.reducer;
