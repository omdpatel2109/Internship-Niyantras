"use client"; // Needed because this component switches between viewing and editing employee data.

import Link from "next/link";
import { useState } from "react";
import { useEmployeeContext } from "@/context/EmployeeContext";
import type {Employee} from './type';

type Props = {
  employee: Employee;
};

export default function EmployeeDetails({ employee }: Props) {

  const {
    employees = [],
    updateEmployee,
  } = useEmployeeContext();

  const existingEmployee = employees.find((emp: any) => emp.id === employee.id) || employee;

  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState(existingEmployee.firstName);
  const [lastName, setLastName] = useState(existingEmployee.lastName);
  const [email, setEmail] = useState(existingEmployee.email);
  const [department, setDepartment] = useState(existingEmployee.company.department);
  const [title, setTitle] = useState(existingEmployee.company.title);

  function handleSave() {
    const updatedEmployee = {
        ...existingEmployee,
        firstName,
        lastName,
        email,
        company: {
            ...existingEmployee.company,
            department,
            title,
        },
    };

    updateEmployee(updatedEmployee);

    setIsEditing(false);
  }

  function handleCancel() {
    setFirstName(existingEmployee.firstName);
    setLastName(existingEmployee.lastName);
    setEmail(existingEmployee.email);
    setDepartment(existingEmployee.company.department);
    setTitle(existingEmployee.company.title);

    setIsEditing(false);
  }

  return (
    <div className="rounded-[8px] bg-white p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <div className="mb-[25px] flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-gray-800">
          Employee Details
        </h1>

        <Link
          href="/employees"
          className="rounded-[5px] bg-gray-700 px-[15px] py-[9px] text-white hover:bg-black"
        >
          Back to Employees
        </Link>
      </div>

      {!isEditing ? (
        <>
          <div className="space-y-[18px]">
            <div>
              <p className="font-bold text-[#555]">First Name</p>
              <p className="text-gray-800">{existingEmployee.firstName}</p>
            </div>

            <div>
              <p className="font-bold text-[#555]">Last Name</p>
              <p className="text-gray-800">{existingEmployee.lastName}</p>
            </div>

            <div>
              <p className="font-bold text-[#555]">Email</p>
              <p className="text-gray-800">{existingEmployee.email}</p>
            </div>

            <div>
              <p className="font-bold text-[#555]">Department</p>
              <p className="text-gray-800">
                {existingEmployee.company.department}
              </p>
            </div>

            <div>
              <p className="font-bold text-[#555]">Title</p>
              <p className="text-gray-800">
                {existingEmployee.company.title}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="mt-[30px] rounded-[5px] bg-green-600 px-[18px] py-[10px] text-white hover:bg-green-700"
          >
            Edit Employee
          </button>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-[18px]"
        >
          <div>
            <label
              htmlFor="firstName"
              className="mb-[6px] block font-bold"
            >
              First Name
            </label>

            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-[5px] border border-gray-300 p-[10px] outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-[6px] block font-bold"
            >
              Last Name
            </label>

            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-[5px] border border-gray-300 p-[10px] outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-[6px] block font-bold"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[5px] border border-gray-300 p-[10px] outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="mb-[6px] block font-bold"
            >
              Department
            </label>

            <input
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-[5px] border border-gray-300 p-[10px] outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="mb-[6px] block font-bold"
            >
              Title
            </label>

            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-[5px] border border-gray-300 p-[10px] outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex gap-[15px] pt-[10px]">
            <button
              type="submit"
              className="rounded-[5px] bg-green-600 px-[18px] py-[10px] text-white hover:bg-green-700"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-[5px] bg-gray-600 px-[18px] py-[10px] text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}