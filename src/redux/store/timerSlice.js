import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isTimerOn: false,
  seconds: 30,
  timeChoice: 30,
}

const timerSlice = createSlice({
  name: 'timerSlice',
  initialState,
  reducers: {
    setTimerOn(state, action) {
      state.isTimerOn = action.payload;
    },
    decreaseSeconds(state) {
      state.seconds = state.seconds - 1;
    },
    setSeconds(state, action) {
      state.seconds = action.payload;
      state.timeChoice = action.payload;
    },
    resetSeconds(state) {
      state.seconds = 30;
    }
  }
})

export const { setTimerOn, decreaseSeconds, setSeconds, resetSeconds } = timerSlice.actions;

export default timerSlice.reducer;