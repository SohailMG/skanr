import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme } from "../modules/themeColors.js";

const themeSlice = createSlice({
  name: "recents",
  initialState: {
    theme: Theme.DefaultTheme,
  },
  reducers: {
    setTheme(state, action) {
      state.theme =
        action.payload === "Light" ? Theme.DefaultTheme : Theme.DarkMode;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
