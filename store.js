import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/appSlice";
import placeDataReducer from "./slices/placeDataSlice";
import recentScansSlice from "./slices/recentsSlice";

export const store = configureStore({
  reducer: {
    appReducer: messageReducer,
    placeReducer: placeDataReducer,
    recentsReducer: recentScansSlice,
  },
});
