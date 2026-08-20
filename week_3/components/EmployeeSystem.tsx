"use client";
import type { Employee } from "./type";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import EmployeeDashboard from "./EmployeeDashboard";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { Suspense } from "react";
import Loading from "./Loading";

type Props = {
  addEmployee: (formData: FormData) => Promise<Employee | null>;
};

export default function EmployeeSystem({ addEmployee }: Props) {
  const { employees, loading } = useEmployeeContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f6f9] px-[30px] py-[30px] font-sans">
      <div className="mx-auto w-full max-w-[1100px]">
        <header className="mb-[30px] text-center">
          <h1 className="mb-[10px] text-[28px] font-bold text-gray-900">
            Employee Management System
          </h1>
          <p className="text-[16px] text-[#666]">
            Welcome to the Employee Management System!
          </p>
        </header>

        <section className="mb-[30px] rounded-[8px] bg-white p-[25px]">
          <EmployeeDashboard employees={employees} />
        </section>

        <section
          aria-labelledby="add-employee-heading"
          className="mb-[30px] w-full rounded-[8px] bg-white p-[25px]"
        >
          <EmployeeForm action={addEmployee} />
        </section>

        <section className="mb-[30px] rounded-[8px] bg-white p-[25px]">
          <Suspense fallback={<Loading />}>
            <EmployeeList  />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
