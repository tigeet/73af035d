import { combineReducers, configureStore } from "@reduxjs/toolkit";
import metaReducer from "slices/fonts";
import loadReducer from "slices/load";
import paramsReducer from "slices/options";
import settingsReducer from "slices/settings";

const rootReducer = combineReducers({
  meta: metaReducer,
  options: paramsReducer,
  settings: settingsReducer,
  load: loadReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
