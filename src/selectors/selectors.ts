import { RootState } from "store/store";

const getFontsMeta = (state: RootState) => state.meta;
const getParams = (state: RootState) => state.options;
const getAppSettings = (state: RootState) => state.settings;
const getUsedFonts = (state: RootState) => state.load;
export const getUser = (state: RootState) => state.user.user;
export { getFontsMeta, getParams, getAppSettings, getUsedFonts };
