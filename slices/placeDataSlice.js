import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const placeDataSlice = createSlice({
  name: "message",
  initialState: {
    placeData: null,
  },
  reducers: {
    setPlaceData(state, action) {
      state.placeData = action.payload;
    },
  },
});

export const { setPlaceData } = placeDataSlice.actions;
export default placeDataSlice.reducer;
