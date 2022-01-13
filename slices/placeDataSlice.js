import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const placeDataSlice = createSlice({
  name: "message",
  initialState: {
    placeData: null,
    placeImages: [],
    diateryPrefrence: null,
  },
  reducers: {
    setPlaceData(state, action) {
      state.placeData = action.payload;
    },
    setPlaceImages(state, action) {
      state.placeImages = action.payload;
    },
    setDiateryPref(state, action) {
      state.diateryPrefrence = action.payload;
    },
  },
});

export const { setPlaceData, setPlaceImages, setDiateryPref } =
  placeDataSlice.actions;
export default placeDataSlice.reducer;
