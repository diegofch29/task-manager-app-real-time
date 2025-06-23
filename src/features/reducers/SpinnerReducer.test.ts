import spinnerReducer, { startLoading, stopLoading } from "./SpinnerReducer";

describe("SpinnerReducer", () => {
  const initialState = {
    isLoading: false,
  };

  test("should return the initial state", () => {
    expect(spinnerReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("should handle startLoading", () => {
    const actual = spinnerReducer(initialState, startLoading());
    expect(actual.isLoading).toBe(true);
  });

  test("should handle stopLoading", () => {
    const loadingState = { isLoading: true };
    const actual = spinnerReducer(loadingState, stopLoading());
    expect(actual.isLoading).toBe(false);
  });

  test("should toggle loading state correctly", () => {
    // Start with false
    let state = spinnerReducer(initialState, startLoading());
    expect(state.isLoading).toBe(true);

    // Stop loading
    state = spinnerReducer(state, stopLoading());
    expect(state.isLoading).toBe(false);
  });
});
