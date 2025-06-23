import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask as Task } from "../../models/ITask";

interface TaskState {
  currentTask: Task | null;
}

const initialState: TaskState = {
  currentTask: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask(state, action: PayloadAction<Task>) {
      state.currentTask = action.payload;
    },
    clearTask(state) {
      state.currentTask = null;
    },
  },
});

export const { setTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
