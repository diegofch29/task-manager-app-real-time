import { ITask as Task } from "../../../models/ITask";

interface TaskCreateCardProps {
  fetchTasks?: Function;
}

function TaskCreateCard({ fetchTasks }: TaskCreateCardProps) {
  return <div>Create task</div>;
}

export default TaskCreateCard;
