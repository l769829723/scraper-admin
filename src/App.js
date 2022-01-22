import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Context } from "./store";
import * as Page from "./pages";

import "./App.css";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    flexGrow: 1,
    background: palette.background.default,
  },
}));

const PrivateWrapper = (props) => {
  const [{ credential }] = Context.useContext();
  return credential ? props.children : <Navigate to='/login' replace />;
};

const Router = () => {
  const classes = useStyles();
  const [context, setContext] = Context.useContext();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <PrivateWrapper>
                <Page.Dashboard context={context} setContext={setContext} />
              </PrivateWrapper>
            }
          />
          <Route
            path='/setting'
            element={
              <PrivateWrapper>
                <Page.Setting context={context} setContext={setContext} />
              </PrivateWrapper>
            }
          />
          <Route
            path='/login'
            element={<Page.Login setContext={setContext} />}
            setContext={setContext}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default function App() {
  return (
    <div className='App'>
      <Context.Provider>
        <Router />
      </Context.Provider>
    </div>
  );
}
