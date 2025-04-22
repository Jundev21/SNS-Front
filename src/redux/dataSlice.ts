import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store";

interface searchWordState {
  searchWord: string;
  orderCommand: string;
  userProfileImg: string;
}

const initialState = {
  searchWord: "",
  orderCommand: "createdTime",
  userProfileImg: "",
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
    setUserProfile: (state, action: PayloadAction<string>) => {
      state.userProfileImg = action.payload;
    },
  },
});

export const { setSearchWordTK, setOrderCommandTK, setUserProfile } = searchSlice.actions;

export const selectWord = (state: RootState) => state.searchState.searchWord;

export default searchSlice.reducer;
