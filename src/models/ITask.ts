import { IStatus as Status } from "./IStatus";

export interface ITask {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  dueDate: Date;
  status: Status; // e.g., "todo", "in-progress", "done"
  isCompleted: boolean;
  teamId: string;
  order: number;
}
