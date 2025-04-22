import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    searchState: searchReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
