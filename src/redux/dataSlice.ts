import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface searchWordState {
  searchWord: string;
  orderCommand: string;
}

const initialState = {
  searchWord: "최신순",
  orderCommand: "createdTime",
} as searchWordState;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchWordTK: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    setOrderCommandTK: (state, action: PayloadAction<string>) => {
      state.orderCommand = action.payload;
    },
  },
});

export const { setSearchWordTK, setOrderCommandTK } = searchSlice.actions;

export const selectWord = (state: RootState) => state.searchState.searchWord;

export default searchSlice.reducer;
