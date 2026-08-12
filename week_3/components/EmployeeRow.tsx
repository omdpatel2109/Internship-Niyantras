import Link from "next/link";
import type { Employee } from "./type";

type Props = {
  employee: Employee;
};

export default function EmployeeRow({ employee }: Props) {
  return (
    <tr className="even:bg-[#f9f9f9] hover:bg-[#eef7ff]">
      <td className="border border-[#ddd] p-[12px]">
        {employee.firstName}
      </td>

      <td className="border border-[#ddd] p-[12px]">
        {employee.lastName}
      </td>

      <td className="border border-[#ddd] p-[12px]">
        {employee.email}
      </td>

      <td className="border border-[#ddd] p-[12px]">
        {employee.company.department}
      </td>

      <td className="border border-[#ddd] p-[12px]">
        {employee.company.title}
      </td>

      <td className="border border-[#ddd] p-[12px]">
        <Link
          href={`/employees/${employee.id}`}
          className="rounded-[5px] bg-[#0078d4] px-[12px] py-[7px] text-white hover:bg-[#005fa3]"
        >
          View
        </Link>
      </td>
    </tr>
  );
}