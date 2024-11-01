import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "userLogined",
  initialState: {
    profile: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setCurrentUser } = UserSlice.actions;
export default UserSlice.reducer;
