import EmployeeSystem from "@/components/EmployeeSystem";
import { EmployeeProvider } from "@/context/EmployeeContext";
export default function EmployeesPage() {
  return (
      <main className="p-10">
      <EmployeeProvider>
          <EmployeeSystem />
      </EmployeeProvider>
      </main>
  );
}