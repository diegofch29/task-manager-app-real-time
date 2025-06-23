import { appConfig } from "../appConfig";
import { IStatus as Status } from "../models/IStatus";

export class ConfigService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = appConfig.serviceUrl;
  }

  async GetStatusList(): Promise<Status[]> {
    try {
      const response = await fetch(`${this.apiUrl}/configurations/statuses`);
      const data = await response.json();
      return data as Status[];
    } catch (error) {
      throw new Error(`Failed to fetch status list: ${error}`);
    }
  }
}
