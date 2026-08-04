import type { Employee } from "./type";
// import { useEmployeeContext } from "../context/EmployeeContext";

type Props = {
  employee: Employee;
};

export default function EmployeeRow({ employee }: Props) {
 return (
  <tr className="even:bg-[#f9f9f9] hover:bg-[#eef7ff]">

    <td className="border border-[#ddd] p-[12px] text-left">
      {employee.firstName}
    </td>

    <td className="border border-[#ddd] p-[12px] text-left">
      {employee.lastName}
    </td>

    <td className="border border-[#ddd] p-[12px] text-left">
      {employee.email}
    </td>

    <td className="border border-[#ddd] p-[12px] text-left">
      {employee.company.department}
    </td>

    <td className="border border-[#ddd] p-[12px] text-left">
      {employee.company.title}
    </td>

  </tr>
);
}