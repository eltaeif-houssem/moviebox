import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ContextProvider from "./context/index.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
