import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "message",
  initialState: {
    message: false,
    imageUri: null,
    isScanning: false,
    latitude: null,
    longitude: null,
    scannedText: null,
    placeId: null,
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
    setLatitude(state, action) {
      state.latitude = action.payload;
    },
    setLongitude(state, action) {
      state.longitude = action.payload;
    },
    setScannedText(state, action) {
      state.scannedText = action.payload;
    },
    setPlaceId(state, action) {
      state.placeId = action.payload;
    },
  },
});

export const {
  setMessage,
  setIsScanning,
  setImageUri,
  setLatitude,
  setLongitude,
  setScannedText,
  setPlaceId,
} = appSlice.actions;
export default appSlice.reducer;
