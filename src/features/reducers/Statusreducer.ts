import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatus as Status } from "../../models/IStatus";

interface TaskState {
  statusList: Status[] | null;
}

const initialState: TaskState = {
  statusList: null,
};

const taskSlice = createSlice({
  name: "statusList",
  initialState,
  reducers: {
    setStatusList(state, action: PayloadAction<Status[]>) {
      state.statusList = action.payload;
    },
    clearStatusList(state) {
      state.statusList = null;
    },
  },
});

export const { setStatusList, clearStatusList } = taskSlice.actions;
export default taskSlice.reducer;
