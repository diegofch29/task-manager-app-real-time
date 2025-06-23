import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TasksPage from "./pages/TasksPage";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CustomSpinner from "./components/CustomSpinner";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Notification from "./components/Notification";

function App() {
  return (
    <div className="App">
      <Header />
      <FluentProvider theme={webLightTheme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path=":team/tasks" element={<TasksPage />} />
            </Routes>
          </BrowserRouter>
          <Notification />
          <CustomSpinner />
        </Provider>
      </FluentProvider>
    </div>
  );
}

export default App;
