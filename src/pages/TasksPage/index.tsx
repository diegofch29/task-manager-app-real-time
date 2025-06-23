import { useEffect, useState } from "react";
import { TaskService } from "../../services/TaskService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ITask as Task } from "../../models/ITask";
import { useNavigate } from "react-router-dom";
import TaskGeneralCard from "../../components/TaskCards/TaskGeneralCard";
import { FormModes } from "../../Enums/FormModes";
import "./styles.scss";
import {
  startLoading,
  stopLoading,
} from "../../features/reducers/SpinnerReducer";
import { useDispatch } from "react-redux";
import { clearTask } from "../../features/reducers/TaskReducer";
import { useTaskLockSignalR } from "../../hooks/useTaskLockSignalR";

function TasksPage() {
  const dispatch = useDispatch();
  const taskService = new TaskService();
  const selectedteam = useSelector(
    (state: RootState) => state.team.currentTeam
  );
  const selectedTask = useSelector(
    (state: RootState) => state.task.currentTask
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [enableCreateTask, setEnableCreateTask] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    isLocked,
    unlockTask,
    error: lockError,
  } = useTaskLockSignalR({
    teamId: selectedteam?.id || 0,
  });
  useEffect(() => {
    if (lockError) {
      console.error("SignalR Lock Error:", lockError);
    }
  }, [lockError]);

  useEffect(() => {
    if (isLocked !== null) {
      fetchTasks();
      unlockTask();
    }
  }, [isLocked, unlockTask, fetchTasks]);

  function fetchTasks() {
    if (selectedteam?.id) {
      dispatch(startLoading());
      taskService
        .getTasksByTeam(selectedteam.id)
        .then((tasks) => {
          setTasks(tasks);
        })
        .finally(() => {
          dispatch(stopLoading());
        });
    } else {
      navigate(-1);
    }
  }

  function handleTaskCreationState() {
    setEnableCreateTask(!enableCreateTask);
  }

  function handleDismiss() {
    dispatch(clearTask());
  }

  useEffect(() => {
    if (selectedteam?.id && !selectedTask) {
      fetchTasks();
    }
  }, [selectedTask, selectedteam, selectedTask]);

  return (
    <div className="task-page-container">
      <div className="create-task-section">
        {enableCreateTask ? (
          <TaskGeneralCard
            task={{} as Task}
            mode={FormModes.Create}
            fetchTasks={fetchTasks}
            dismiss={handleTaskCreationState}
          />
        ) : (
          <span
            className="material-symbols-outlined create-icon-button"
            onClick={handleTaskCreationState}
          >
            {"add"}
          </span>
        )}
      </div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskGeneralCard
            key={task.id}
            task={task}
            mode={
              selectedTask?.id === task.id ? FormModes.Edit : FormModes.View
            }
            fetchTasks={fetchTasks}
            dismiss={handleDismiss}
          />
        ))}
      </div>
    </div>
  );
}

export default TasksPage;
