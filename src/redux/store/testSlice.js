import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTestStarted: false,
  isTestFinished: false,
  sentences: '4',
};

const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {
    setIsTestStarted(state, action) {
      state.isTestStarted = action.payload;
    },
    setIsTestFinished(state, action) {
      state.isTestFinished = action.payload;
    },
    setSentences(state, action) {
      state.sentences = action.payload;
    },
    resetTestState(state) {
      state.isTestFinished = false;
      state.isTestStarted = false;
      state.sentences = '4';
    }
  }
});

export const {
  setIsTestFinished,
  setIsTestStarted,
  setSentences,
  resetTestState
} = testSlice.actions;

export default testSlice.reducer;