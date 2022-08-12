import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoaded {
  [key: string]: boolean;
}

interface IState {
  loaded: ILoaded;
}

const initialState: IState = {
  loaded: {},
};

const fontStateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    submitFont: (state, action: PayloadAction<string>) => {
      state.loaded = { ...state.loaded, [action.payload]: true };
    },

    submitFonts: (state, action: PayloadAction<string[]>) => {
      const pack: ILoaded = {};
      action.payload.forEach((font) => (pack[font] = true));
      state.loaded = { ...state.loaded, ...pack };
    },
  },
});

export const { submitFont, submitFonts } = fontStateSlice.actions;

export default fontStateSlice.reducer;
