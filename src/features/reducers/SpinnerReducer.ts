import { createSlice } from "@reduxjs/toolkit";

interface SpinnerState {
  isLoading: boolean;
}

const initialState: SpinnerState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = spinnerSlice.actions;
export default spinnerSlice.reducer;
