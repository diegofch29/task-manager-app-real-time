import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface NotificationState {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

const initialState: NotificationState = {
  message: "",
  type: "info",
};

interface ShowNotificationPayload {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

const spinnerSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<ShowNotificationPayload>) {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    clearNotification(state) {
      state.message = "";
    },
  },
});

export const { showNotification, clearNotification } = spinnerSlice.actions;
export default spinnerSlice.reducer;
