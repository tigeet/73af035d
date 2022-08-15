import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ITheme = "light" | "dark";

interface IAppState {
  theme: ITheme;
}

const initialState: IAppState = {
  theme: "dark",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
