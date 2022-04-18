import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme } from "../resources/themeColors.js";

const themeSlice = createSlice({
  name: "recents",
  initialState: {
    theme: Theme.DefaultTheme,
  },
  reducers: {
    setTheme(state, action) {
      state.theme =
        action.payload === true ? Theme.DefaultTheme : Theme.DarkMode;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
