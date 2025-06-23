import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import "./styles.scss";
import { Spinner } from "@fluentui/react-components";

function CustomSpinner() {
  const isLoading = useSelector((state: RootState) => state.spinner.isLoading);
  return (
    <div className={`spinner-container ${isLoading ? "visible" : "hidden"}`}>
      <Spinner appearance="primary" size="huge" />
    </div>
  );
}

export default CustomSpinner;
