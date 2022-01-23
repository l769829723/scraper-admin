import React from "react";

const Action = {
  ON_LOADING: "ON_LOADING",
  ON_ERROR: "ON_ERROR",
  ON_FINISHED: "ON_FINISHED",
  OFF_LOADING: "OFF_LOADING",
  PUSH_OPTIONS: "PUSH_OPTIONS",
};

export function useFetch() {
  const initialState = { loading: false, data: null, status: "", message: "" };

  const [state, dispatch] = React.useReducer((oldState, action) => {
    switch (action.type) {
      case Action.ON_LOADING:
        return { ...oldState, loading: true };
      case Action.ON_ERROR:
        return { ...oldState, status: "ERROR", message: action.payload };
      case Action.ON_FINISHED:
        return { ...oldState, status: "OK", message: "", data: action.payload };
      case Action.OFF_LOADING:
        return { ...oldState, loading: false };
      case Action.PUSH_OPTIONS:
        return { ...oldState, options: action.payload };
      default:
        return oldState;
    }
  }, initialState);

  const dispatchUpdate = (action, payload) =>
    dispatch({ type: action, payload });

  const perform = React.useCallback(async (url, options, callback) => {
    try {
      dispatchUpdate(Action.ON_LOADING);
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
          Origin: window.location.origin,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const newData = callback ? callback(data) : data;
        dispatchUpdate(Action.ON_FINISHED, newData);
        return data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      dispatchUpdate(Action.ON_ERROR, error.message);
    } finally {
      dispatchUpdate(Action.OFF_LOADING);
    }
  }, []);

  return { ...state, perform };
}
