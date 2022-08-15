import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fontStateReducer from "slices/loading";
import metaReducer from "slices/meta";
import paramsReducer from "slices/params";
import settingsReducer from "slices/settings";

const rootReducer = combineReducers({
  meta: metaReducer,
  params: paramsReducer,
  fontState: fontStateReducer,
  settings: settingsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
