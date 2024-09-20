import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "@routes/index";
import InfiniteSpinner from "@components/spinners/InfiniteSpinner";

const App: React.FC = () => {
  return (
    <Suspense fallback={<InfiniteSpinner />}>
      <Routes>
        {routes.map((route, key) => (
          <Route path={route.path} element={route.element} key={key} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
