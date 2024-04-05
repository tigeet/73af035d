import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

type ILoadedFont = {
  name: string;
  url: string;
};
type ILoadState = {
  used: ILoadedFont[];
};

const initialState: ILoadState = {
  used: [],
};

const used = new Set();

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    use: (state, action: PayloadAction<ILoadedFont>) => {
      console.log("@use", action.payload);
      if (used.has(action.payload.name)) return;
      used.add(action.payload.name);
      state.used = [...state.used, action.payload];
    },

    del: (state, action: PayloadAction<string>) => {
      console.log("@del", action.payload);
      if (!used.has(action.payload)) return;
      used.delete(action.payload);
      state.used = state.used.filter((font) => font.name !== action.payload);
    },
  },
});

export const { use, del } = loadSlice.actions;
export default loadSlice.reducer;
