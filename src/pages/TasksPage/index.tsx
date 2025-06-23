import { useEffect, useState, useCallback } from "react";
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
  console.log("TasksPage Rendered");
  const dispatch = useDispatch();
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

  const fetchTasks = useCallback(() => {
    const taskService = new TaskService();
    if (selectedteam?.id) {
      dispatch(startLoading());
      taskService
        .getTasksByTeam(selectedteam.id)
        .then((tasks) => {
          setTasks(tasks);
        })
        .catch((error) => {
          console.error("Failed to fetch tasks:", error);
        })
        .finally(() => {
          dispatch(stopLoading());
        });
    } else {
      navigate(-1);
    }
  }, [selectedteam?.id, dispatch, navigate]);

  useEffect(() => {
    if (selectedteam?.id && tasks.length === 0) {
      fetchTasks();
    } else if (!selectedteam?.id) {
      navigate(-1);
    }
  }, [selectedteam?.id, isLocked, fetchTasks, navigate]);

  useEffect(() => {
    if (isLocked) {
      fetchTasks();
      unlockTask();
    }
  }, [isLocked, fetchTasks, unlockTask]);

  function handleTaskCreationState() {
    setEnableCreateTask(!enableCreateTask);
  }

  function handleDismiss() {
    dispatch(clearTask());
  }

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
      {tasks.length === 0 && (
        <div className="no-tasks-message">
          No tasks available. Please create a task.
        </div>
      )}
    </div>
  );
}

export default TasksPage;
