import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getText from "../../api/getText";

export const fetchText = createAsyncThunk(
  'textSlice/fetchText',
  async function (sentences, { rejectWithValue }) {
    try {
      const response = await getText(sentences);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  text: [],
  error: null,
  mistakes: 0,
  pressingCount: 0,
  currentCharIndex: 0
}

const textSlice = createSlice({
  name: 'textSlice',
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
    setCurrentCharIndex(state, action) {
      state.currentCharIndex = action.payload;
    },
    setMistakes(state, action) {
      state.mistakes = action.payload;
    },
    increasePressingCount(state) {
      state.pressingCount = state.pressingCount + 1;
    },
    resetTextState(state) {
      state.currentCharIndex = 0;
      state.mistakes = 0;
      state.pressingCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchText.fulfilled, (state, action) => {
        state.text = action.payload.split('').map((item, index) => {
          return index === 0 ?
            { char: item, class: 'current-char' } :
            { char: item, class: '' }
        });
        state.isLoading = false;
      })
      .addCase(fetchText.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchText.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      });
  }
});

export const { setText, setCurrentCharIndex, setMistakes, increasePressingCount, resetTextState } = textSlice.actions;

export default textSlice.reducer;

