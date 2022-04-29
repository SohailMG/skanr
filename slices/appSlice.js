import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "message",
  initialState: {
    scanActive: false,
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
    setScanActive(state, action) {
      state.scanActive = action.payload;
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
  setScanActive,
  setIsScanning,
  setImageUri,
  setUserLocation,
  setScannedText,
  setPlaceId,
  setRecents,
} = appSlice.actions;
export default appSlice.reducer;
