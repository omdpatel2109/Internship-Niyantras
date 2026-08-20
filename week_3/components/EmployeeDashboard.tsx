import type { Employee } from "./type";

type Props = {
  employees: Employee[];
};

export default function EmployeeDashboard({ employees }: Props) {
  const departments = new Set(
    employees.map((employee) => employee.company.department)
  );

  return (
    <section className="mb-[30px] rounded-[8px] bg-white p-[25px] dark:bg-gray-800">
      <h2 className="mb-[20px] text-[20px] font-bold text-gray-900 dark:text-white">
        Employee Dashboard
      </h2>

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">

        <div className="rounded-[8px] bg-blue-100 p-[20px] dark:bg-blue-600 ">
          <h3 className="font-bold text-gray-700 dark:text-blue-300">
            Total Employees
          </h3>

          <p className="mt-[10px] text-[30px] font-bold text-blue-700 dark:text-blue-300">
            {employees.length}
          </p>
        </div>

        <div className="rounded-[8px] bg-green-100 p-[20px] dark:bg-green-600" >
          <h3 className="font-bold text-gray-700 dark:text-green-300">
            Departments
          </h3>

          <p className="mt-[10px] text-[30px] font-bold text-green-700 dark:text-green-300">
            {departments.size}
          </p>
        </div>

        <div className="rounded-[8px] bg-purple-100 p-[20px] dark:bg-purple-600">
          <h3 className="font-bold text-gray-700 dark:text-gray-200">
            Showing Employees
          </h3>

          <p className="mt-[10px] text-[30px] font-bold text-purple-700 dark:text-purple-300">
            {employees.length}
          </p>
        </div>

      </div>
    </section>
  );
}