import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/AuthSlice";
import userSlice from "./features/UserLoginedSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
