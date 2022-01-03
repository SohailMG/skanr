import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    appReducer: messageReducer,
  },
});
