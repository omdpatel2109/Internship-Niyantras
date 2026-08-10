import type { Employee } from "./type";
import EmployeeRow from "./EmployeeRow";

type Props = {
  employees: Employee[];
};

export default function EmployeeList({ employees }: Props) {
  return (
    <div className="bg-white p-[25px] rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <h2
        id="employee-list-heading"
        className="mb-[20px] text-[20px] font-bold text-[#333]"
      >
        Employee List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                First Name
              </th>
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Last Name
              </th>
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Email
              </th>
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Department
              </th>
              <th className="border border-[#ddd] p-[12px] text-left bg-[#0078d4] text-white">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <EmployeeRow key={index} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
