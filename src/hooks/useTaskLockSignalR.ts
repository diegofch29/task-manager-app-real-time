import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { appConfig } from "../appConfig";

interface UseTaskLockSignalRProps {
  teamId: number | string;
}

export const useTaskLockSignalR = ({ teamId }: UseTaskLockSignalRProps) => {
  const [isLocked, setIsLocked] = useState(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const hubUrl = `${appConfig.serviceUrl}/hubs/teamtask`;

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await hubConnection.start();
        setConnection(hubConnection);
        setError(null);

        // Subscribe to task lock updates
        hubConnection.on(`TaskChanged_${teamId}`, (lockState: boolean) => {
          setIsLocked(true);
        });

        // Check initial lock state
        try {
          const initialLockState = await hubConnection.invoke(
            "JoinTeamGroup",
            teamId
          );
          setIsLocked(initialLockState);
        } catch (err) {
          console.error("Failed to get initial lock state:", err);
        }
      } catch (err) {
        setError("Failed to connect to SignalR hub");
        console.error("SignalR Connection Error:", err);
      }
    };

    startConnection();

    return () => {
      if (hubConnection) {
        hubConnection.off(`taskLock_${teamId}`);
        hubConnection.stop();
      }
    };
  }, [teamId, hubUrl]);

  const unlockTask = async () => {
    setIsLocked(false);
  };

  return {
    isLocked,
    unlockTask,
    error,
    isConnected: connection?.state === signalR.HubConnectionState.Connected,
  };
};
