import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "message",
  initialState: {
    message: false,
    imageUri: null,
    isScanning: false,
    userLocation: null,
    scannedText: null,
    placeId: null,
    recents: null,
  },
  reducers: {
    setImageUri(state, action) {
      state.imageUri = action.payload;
    },
    setRecents(state, action) {
      state.recents = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setIsScanning(state, action) {
      state.isScanning = action.payload;
    },
    setUserLocation(state, action) {
      state.userLocation = action.payload;
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
  setUserLocation,
  setScannedText,
  setPlaceId,
  setRecents,
} = appSlice.actions;
export default appSlice.reducer;
