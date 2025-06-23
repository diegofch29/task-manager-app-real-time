import { useEffect, useRef, useState } from "react";
import { ITask as Task } from "../../../models/ITask";

import { clearTask } from "../../../features/reducers/TaskReducer";
import { useDispatch } from "react-redux";
import "./styles.scss";
import {
  Button,
  Dropdown,
  Field,
  Input,
  Option,
  Textarea,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import StatusCard from "../../StatusCard";
import { TaskService } from "../../../services/TaskService";
import { showNotification } from "../../../features/reducers/NotificationReducer";

interface props {
  task: Task;
  fetchTasks: Function;
  dismiss: Function;
}

function TaskEditCard({ task, fetchTasks, dismiss }: props) {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState<string | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const statusList = useSelector(
    (state: RootState) => state.statusList.statusList
  );
  const taskService = new TaskService();
  const cardRef = useRef<HTMLFormElement>(null);
  const selectedteam = useSelector(
    (state: RootState) => state.team.currentTeam
  );
  const [haveTriedSave, setHaveTriedSave] = useState<boolean>(false);

  function validateForm() {
    if (!updatedTask?.title || !updatedTask?.description) {
      setFormError("Title and Description are required.");
      return false;
    }
    const date = new Date(updatedTask?.dueDate);
    if (isNaN(date.getTime())) {
      setFormError("Due Date must be a valid date.");
      return false;
    } else {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      if (date <= now) {
        setFormError("Due Date must be after today.");
        return false;
      }
    }
    return true;
  }

  function updateTask() {
    taskService
      .updateTask(updatedTask)
      .then((response) => {
        if (response) {
          dismiss();
          fetchTasks();
          dispatch(
            showNotification({
              message: "Task updated successfully",
              type: "success",
            })
          );
        }
      })
      .catch((error) => {
        setFormError(
          error.message || "An error occurred while updating the task."
        );
      });
  }

  function createTask(taskToCreate: Task) {
    if (selectedteam?.id) {
      taskService
        .createTask({ ...taskToCreate, teamId: selectedteam?.id })
        .then((response) => {
          if (response) {
            dismiss();
            fetchTasks();
            dispatch(
              showNotification({
                message: "Task created successfully",
                type: "success",
              })
            );
          }
        })
        .catch((error) => {
          setFormError(
            error.message || "An error occurred while updating the task."
          );
        });
    } else {
      dispatch(
        showNotification({ message: "Missing team selection", type: "error" })
      );
    }
  }

  function handleSave() {
    setHaveTriedSave(true);
    if (!validateForm()) {
      return;
    } else {
      if (updatedTask?.id) {
        updateTask();
      } else {
        createTask(updatedTask);
      }
    }
  }

  function handleCancel() {
    dispatch(clearTask());
    dismiss();
  }

  const onOptionSelect = (
    ev: React.SyntheticEvent,
    data: { selectedOptions: string[]; optionText?: string }
  ) => {
    setUpdatedTask({
      ...updatedTask,
      status:
        statusList?.find(
          (status) =>
            status.name === (data.optionText ?? data.selectedOptions[0])
        ) || updatedTask?.status,
    });
  };

  function showErrorValidation(value: any) {
    return !value && haveTriedSave;
  }

  useEffect(() => {
    if (formError) {
      dispatch(showNotification({ message: formError, type: "error" }));
      setFormError(null);
    }
  }, [formError, dispatch]);

  return (
    <form
      ref={cardRef}
      className="task-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <Field
        className="task-field"
        label="Title:"
        validationState={`${
          showErrorValidation(updatedTask?.title) ? "error" : "none"
        }`}
        validationMessage={
          showErrorValidation(updatedTask?.title) ? "Field required" : ""
        }
      >
        <Input
          type="text"
          name="title"
          value={updatedTask?.title}
          onChange={(_, data) =>
            setUpdatedTask({ ...updatedTask, title: data.value || "" })
          }
        />
      </Field>
      <Field
        className="task-field"
        label="Description:"
        validationState={`${
          showErrorValidation(updatedTask?.description) ? "error" : "none"
        }`}
        validationMessage={
          showErrorValidation(updatedTask?.description) ? "Field required" : ""
        }
      >
        <Textarea
          rows={3}
          name="description"
          value={updatedTask?.description}
          onChange={(_, newValue) =>
            setUpdatedTask({
              ...updatedTask,
              description: newValue.value || "",
            })
          }
        />
      </Field>
      <div className="dropdown-container">
        <Field
          className="dropdown-field"
          label="Status"
          validationState={`${
            showErrorValidation(updatedTask?.status) ? "error" : "none"
          }`}
          validationMessage={
            showErrorValidation(updatedTask?.status) ? "Field required" : ""
          }
        >
          <Dropdown
            className="dropdown-status"
            size="medium"
            defaultValue={updatedTask?.status?.name}
          >
            {(statusList ?? []).map((status) => (
              <Option key={status.id} value={status.name} text={status.name}>
                <StatusCard status={status} width="50pt" />
              </Option>
            ))}
          </Dropdown>
        </Field>
        <Field
          className="task-field"
          label="Due Date:"
          validationState={`${
            showErrorValidation(updatedTask?.dueDate) ? "error" : "none"
          }`}
          validationMessage={
            showErrorValidation(updatedTask?.dueDate) ? "Field required" : ""
          }
        >
          <DatePicker
            className="task-field"
            value={
              updatedTask?.dueDate ? new Date(updatedTask?.dueDate) : undefined
            }
            placeholder="Select a due date"
            onSelectDate={(date) => {
              setUpdatedTask({
                ...updatedTask,
                dueDate: date ? date : updatedTask?.dueDate,
              });
            }}
          />
        </Field>
      </div>
      <div className="task-buttons-container">
        <Button
          className="task-button save-button"
          appearance="transparent"
          icon={
            <span className="material-symbols-outlined team-icon">
              {"Save"}
            </span>
          }
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="task-button cancel-button"
          icon={
            <span className="material-symbols-outlined team-icon">
              {"cancel"}
            </span>
          }
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default TaskEditCard;
