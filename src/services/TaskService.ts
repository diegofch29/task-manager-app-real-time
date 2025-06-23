import { appConfig } from "../appConfig";
import { ITask as Task } from "../models/ITask";

export class TaskService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = appConfig.serviceUrl;
  }

  async getTasksByTeam(teamId: string): Promise<Task[]> {
    try {
      const response = await fetch(`${this.apiUrl}/tasks/team/${teamId}`);
      const data = await response.json();
      return data as Task[];
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error}`);
    }
  }

  async createTask(task: Task): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to create task: ${error}`);
    }
  }

  async updateTask(task: Task): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to update task: ${error}`);
    }
  }

  async deleteTask(taskId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete task: ${error}`);
    }
  }
}
