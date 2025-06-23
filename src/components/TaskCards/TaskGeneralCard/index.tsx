import { FormModes } from "../../../Enums/FormModes";
import { ITask as Task } from "../../../models/ITask";
import TaskEditCard from "../TaskEditCard";
import TaskViewCard from "../TaskViewCard";

interface props {
  task: Task;
  mode: FormModes;
  fetchTasks: Function;
  dismiss: Function;
}

function TaskGeneralCard({ task, mode, fetchTasks, dismiss }: props) {
  function hanldeModeSelected() {
    switch (mode) {
      case FormModes.View:
        return <TaskViewCard task={task} fetchTasks={fetchTasks} />;
      case FormModes.Edit:
        return (
          <TaskEditCard task={task} fetchTasks={fetchTasks} dismiss={dismiss} />
        );
      case FormModes.Create:
        return (
          <TaskEditCard
            task={{} as Task}
            fetchTasks={fetchTasks}
            dismiss={dismiss}
          />
        );
      default:
        return <div>Unknown Mode</div>;
    }
  }
  return hanldeModeSelected();
}

export default TaskGeneralCard;
