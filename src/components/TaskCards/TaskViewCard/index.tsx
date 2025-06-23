import { ITask as Task } from "../../../models/ITask";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { clearTask, setTask } from "../../../features/reducers/TaskReducer";
import { Button, Text } from "@fluentui/react-components";
import StatusCard from "../../StatusCard";
import { TaskService } from "../../../services/TaskService";
import { showNotification } from "../../../features/reducers/NotificationReducer";
import {
  startLoading,
  stopLoading,
} from "../../../features/reducers/SpinnerReducer";
import { Exception } from "sass";

interface props {
  task: Task;
  fetchTasks: Function;
}

function TaskViewCard({ task, fetchTasks }: props) {
  const dispatch = useDispatch();
  const taskService = new TaskService();

  function handleTaskSelected() {
    dispatch(setTask(task));
  }

  function handleDeletetask() {
    dispatch(startLoading());
    taskService
      .deleteTask(task.id)
      .then((response) => {
        if (response) {
          clearTask();
          dispatch(
            showNotification({
              message: "Task deleted succesfully",
              type: "success",
            })
          );
          fetchTasks();
        }
      })
      .catch((e: Exception) => {
        dispatch(
          showNotification({
            message: e.message,
            type: "error",
          })
        );
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  }

  return (
    <div className="task-view-container">
      <div className="information-container">
        <div className="task-title">{task.title}</div>
        <div className="task-description">{task.description}</div>
        <div className="task-due-date">
          {task.dueDate ? require("moment")(task.dueDate).format("LL") : ""}
        </div>
        {task?.status && <StatusCard status={task.status} width="50pt" />}
      </div>
      <div className="task-button-container">
        <Button
          className="task-button  edit"
          icon={
            <span className="material-symbols-outlined task-icon edit">
              {"edit"}
            </span>
          }
          onClick={handleTaskSelected}
        />
        <Button
          className="task-button delete"
          icon={
            <span className="material-symbols-outlined team-icon delete">
              {"Delete"}
            </span>
          }
          onClick={handleDeletetask}
        />
      </div>
    </div>
  );
}

export default TaskViewCard;
