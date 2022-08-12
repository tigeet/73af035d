import { combineReducers, configureStore } from "@reduxjs/toolkit";
import metaReducer from "slices/meta";
import paramsReducer from "slices/params";
import fontStateReducer from "slices/loading";
const rootReducer = combineReducers({
  meta: metaReducer,
  params: paramsReducer,
  fontState: fontStateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
