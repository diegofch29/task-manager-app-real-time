import { IStatus as Status } from "../../models/IStatus";
import "./styles.scss";

interface StatusCardProps {
  status: Status;
  width?: string;
  height?: string;
}

function StatusCard({ status, width, height }: StatusCardProps) {
  return (
    <div
      className="status-card"
      style={{
        backgroundColor: `#${status.color}`,
        width: width || "fit-content",
        height: height || "fit-content",
      }}
    >
      <div className="status-name">{status.name}</div>
    </div>
  );
}

export default StatusCard;
