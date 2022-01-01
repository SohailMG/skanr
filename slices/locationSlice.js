import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "message",
  initialState: {
    message: false,
    imageUri: null,
    isScanning: false,
  },
  reducers: {
    setImageUri(state, action) {
      state.imageUri = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setIsScanning(state, action) {
      state.isScanning = action.payload;
    },
  },
});

export const { setMessage, setIsScanning, setImageUri } = appSlice.actions;
export default appSlice.reducer;
