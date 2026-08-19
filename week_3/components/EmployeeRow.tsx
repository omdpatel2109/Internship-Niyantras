import Link from "next/link";
import type { Employee } from "./type";
import useEmployee from "@/hooks/Employee";
import { useEmployeeContext } from "@/context/EmployeeContext";

type Props = {
  employee: Employee;
};

export default function EmployeeRow({ employee }: Props) {
  const { employees, deleteEmployee } = useEmployeeContext();

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
          className="rounded-[5px] bg-blue-500 px-[12px] py-[7px] text-white hover:bg-blue-600"
        >
          View
        </Link>
      </td>

      <td  className="border border-[#ddd] p-[12px]">
        <button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this employee?"
            );

            if (confirmed) {
              deleteEmployee(employee.id);
            }
          }}
          className="rounded-[5px] bg-red-600 px-[12px] py-[7px] text-white hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}