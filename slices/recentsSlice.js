import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const recentScansSlice = createSlice({
  name: "recents",
  initialState: {
    recentScans: null,
  },
  reducers: {
    setRecentScans(state, action) {
      state.recentScans = action.payload;
    },
  },
});

export const { setRecentScans } = recentScansSlice.actions;
export default recentScansSlice.reducer;
