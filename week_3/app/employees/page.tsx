import EmployeeSystem from "@/components/EmployeeSystem";
import { EmployeeProvider } from "@/context/EmployeeContext";
import type { Employee } from "@/components/type";

export const dynamic = "force-dynamic";

async function addEmployee(formData: FormData): Promise<Employee | null> {
    "use server";

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const department = String(formData.get("department") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();

    if (!firstName || !lastName || !email || !department || !title) {
      return null;
    }

    const employee: Employee = {
      firstName,
      lastName,
      email,
      company: {
        department,
        title,
      },
    };

    return employee;
}

export default function EmployeesPage() {
  return (
    <main className="p-10">
      <EmployeeProvider>
        <EmployeeSystem addEmployee={addEmployee} />
      </EmployeeProvider>
    </main>
  );
}