import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import TasksPage from "./pages/TasksPage/TasksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="tasks" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
