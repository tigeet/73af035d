import { RootState } from "store/store";

const getFontsMeta = (state: RootState) => state.meta.fonts;
const getFontsMetaLength = (state: RootState) => state.meta.length;
const getParams = (state: RootState) => state.params;
const getFontsState = (state: RootState) => state.fontState;

export { getFontsMeta, getFontsMetaLength, getParams, getFontsState };
