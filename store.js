import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/locationSlice";

export const store = configureStore({
  reducer: {
    appReducer: messageReducer,
  },
});
