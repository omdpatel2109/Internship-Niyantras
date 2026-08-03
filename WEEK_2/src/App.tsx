import './App.css';
import EmployeeSystem from "./components/EmployeeSystem";
import { EmployeeProvider } from "./context/EmployeeContext";
import "./index.css";

function App() {
  return (
    <EmployeeProvider>
      <EmployeeSystem />
    </EmployeeProvider>
  );
}

export default App;