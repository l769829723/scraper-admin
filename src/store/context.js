import React from "react";
import dayjs from "dayjs";
import CONFIG from "../config";
import C from "../config/constant";
import { ThemeProvider } from "@mui/material/styles";

const useAppContext = ({ values = {} }) => {
  const [context, dispatch] = React.useReducer(
    (state, { reducer, payload }) => {
      return reducer(state, payload);
    },
    values
  );

  const setContext = (action, payload) => {
    try {
      console.info(
        `[SCCESS] [${dayjs().format(C.DATETIME_FORMAT)}] [ACTION]: ${
          action.type
        } ${JSON.stringify(payload)}`
      );
      dispatch({ reducer: action.reducer, payload });
    } catch (error) {
      console.error(
        `[ERROR] [${dayjs().format(C.DATETIME_FORMAT)}] [ACTION]: ${
          action.type
        }`
      );
    }
  };

  return [context, setContext];
};

const createContextHook = (useValue) => {
  const Context = React.createContext();

  const Provider = (props) => {
    const [context, setContext] = useValue({ ...props.values, values: CONFIG });

    return (
      <ThemeProvider theme={{ ...context.theme }}>
        <Context.Provider value={[context, setContext]}>
          {props.children}
        </Context.Provider>
      </ThemeProvider>
    );
  };

  const useContext = () => React.useContext(Context);

  return { Provider, useContext };
};

export default createContextHook(useAppContext);
