import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "@routes/index";

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route path={route.path} element={route.element} key={key} />
      ))}
    </Routes>
  );
};

export default App;
