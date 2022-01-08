import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const placeDataSlice = createSlice({
  name: "message",
  initialState: {
    placeData: null,
    placeImages: [],
  },
  reducers: {
    setPlaceData(state, action) {
      state.placeData = action.payload;
    },
    setPlaceImages(state, action) {
      state.placeImages = action.payload;
    },
  },
});

export const { setPlaceData, setPlaceImages } = placeDataSlice.actions;
export default placeDataSlice.reducer;
