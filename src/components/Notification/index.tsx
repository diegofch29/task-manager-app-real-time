import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
} from "@fluentui/react-components";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import "./styles.scss";
import { clearNotification } from "../../features/reducers/NotificationReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Notification() {
  const notification = useSelector((state: RootState) => state.notification);
  const { message, type } = notification;

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, dispatch]);

  return (
    <div
      className={`notification-container ${!message ? "hidden" : "visible"}`}
    >
      <MessageBar key={type} intent={type} className="notification-bar">
        <MessageBarBody>
          <MessageBarTitle>
            {type === "success" && "Success"}
            {type === "error" && "Error"}
            {type === "info" && "Info"}
            {type === "warning" && "Warning"}
          </MessageBarTitle>
          {message}
        </MessageBarBody>
      </MessageBar>
    </div>
  );
}

export default Notification;
