import { createSlice } from "@reduxjs/toolkit";

export const userLoginedSlice = createSlice({
  name: "userLogined",
  initialState: {
    userid: 1,
  },
  reducers: {
    setCurrentUserId: (state, action) => {
      state.userid = action.payload;
    },
  },
});

export const { setCurrentUserId } = userLoginedSlice.actions;
export default userLoginedSlice.reducer;
