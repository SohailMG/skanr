import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/appSlice";
import placeDataReducer from "./slices/placeDataSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    appReducer: messageReducer,
    placeReducer: placeDataReducer,
    themeReducer: themeSlice,
  },
});
