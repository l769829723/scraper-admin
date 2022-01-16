import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./store";
import * as Page from "./pages";

import "./App.css";

const Router = () => {
  const [context, setContext] = Context.useContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Page.Dashboard context={context} setContext={setContext} />}
        />
        <Route
          path='/setting'
          element={<Page.Setting context={context} setContext={setContext} />}
        />
        <Route
          path='/login'
          element={<Page.Login setContext={setContext} />}
          setContext={setContext}
        />
      </Routes>
    </BrowserRouter>
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
