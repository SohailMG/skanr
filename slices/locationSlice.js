import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "message",
  initialState: {
    message: false,
    isScanning:false,
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    setIsScanning(state, action) {
      state.isScanning = action.payload;
    },
  },
});

export const { setMessage,setIsScanning } = appSlice.actions;
export default appSlice.reducer;
