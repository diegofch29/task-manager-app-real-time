import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./index";

describe("Header Component", () => {
  test("renders header with correct title", () => {
    render(<Header />);

    const titleElement = screen.getByText("Task Management (Real Time)");
    expect(titleElement).toBeInTheDocument();
  });

  test("has correct CSS class", () => {
    render(<Header />);

    const headerContainer = document.querySelector(".header-container");
    expect(headerContainer).toBeInTheDocument();
  });

  test("header title has correct CSS class", () => {
    render(<Header />);

    const titleElement = document.querySelector(".header-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Task Management (Real Time)");
  });
});
