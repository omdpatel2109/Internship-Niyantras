import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </React.StrictMode>
);