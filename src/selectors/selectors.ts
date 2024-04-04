import { RootState } from "store/store";

const getFontsMeta = (state: RootState) => state.meta;
const getParams = (state: RootState) => state.options;
const getAppSettings = (state: RootState) => state.settings;
export { getFontsMeta, getParams, getAppSettings };
