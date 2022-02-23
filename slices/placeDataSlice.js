import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const placeDataSlice = createSlice({
  name: "message",
  initialState: {
    placeData: null,
    placeImages: [],
    diateryPrefrence: null,
    cuisine: null,
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
    setCuisine(state, action) {
      state.cuisine = action.payload;
    },
  },
});

export const { setPlaceData, setPlaceImages, setDiateryPref, setCuisine } =
  placeDataSlice.actions;
export default placeDataSlice.reducer;
