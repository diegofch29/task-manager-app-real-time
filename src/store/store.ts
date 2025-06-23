import { configureStore } from "@reduxjs/toolkit";
import TeamReducer from "../features/reducers/TeamReducer";
import TaskReducer from "../features/reducers/TaskReducer";
import SpinnerReducer from "../features/reducers/SpinnerReducer";
import StatusReducer from "../features/reducers/Statusreducer";
import NotificationReducer from "../features/reducers/NotificationReducer";

export const store = configureStore({
  reducer: {
    team: TeamReducer,
    task: TaskReducer,
    spinner: SpinnerReducer,
    statusList: StatusReducer,
    notification: NotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
