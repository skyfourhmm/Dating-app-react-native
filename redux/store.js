import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/AuthSlice";
import userSlice from "./features/UserSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
