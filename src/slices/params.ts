import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IParams, TCategory } from "types/params";

const initialState: IParams = {
  search: "",
  template: "",
  fontSize: 24,
  // categories: {
  //   Serif: true,
  //   "Sans Serif": true,
  //   Monospace: true,
  //   Handwriting: true,
  //   Display: true,
  // },
  categories: ["Serif", "Sans Serif", "Monospace", "Handwriting", "Display"],
  language: "All languages",
  onlyVariable: false,
  sort: "trending",
  display: "grid",
};

// типизировать createSlice
const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    // wrap dispatch in deferred value
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    // wrap dispatch in deferred value
    setTemplate: (state, action: PayloadAction<string>) => {
      state.template = action.payload;
    },
    // wrap dispatch in deferred value
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    toggleCategories: (state, action: PayloadAction<TCategory[]>) => {
      // state.categories = {
      //   ...state.categories,
      //   [action.payload]: !state.categories[action.payload],
      // };

      state.categories = [...action.payload];
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {
  setSearch,
  setTemplate,
  setFontSize,
  toggleCategories,
  setLanguage,
} = paramsSlice.actions;
export default paramsSlice.reducer;
