import './App.css';
import EmployeeSystem from "./components/EmployeeSystem";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <EmployeeProvider>
      <EmployeeSystem />
    </EmployeeProvider>
  );
}

export default App;