import { RootState } from "store/store";

const getFontsMeta = (state: RootState) => state.meta;
const getParams = (state: RootState) => state.params;
const getFontsState = (state: RootState) => state.fontState;
const getAppSettings = (state: RootState) => state.settings;
export { getFontsMeta, getParams, getFontsState, getAppSettings };
