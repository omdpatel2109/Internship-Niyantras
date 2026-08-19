"use client";  // needed because this form uses usestate and browser event handlers.
import React, { useState } from "react";
import { useEmployeeContext } from "@/context/EmployeeContext";

type Props = {
  action: (formData: FormData) => Promise<any>;
};

export default function EmployeeForm({ action }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const { addEmployee } = useEmployeeContext();

  async function handleSubmit(event: any) {
    event.preventDefault(); //stops browser for a specific event

    const formData = new FormData(event.currentTarget);
    const employee = await action(formData);

    if (employee) {
      addEmployee(employee);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");
      setTitle("");
    }
  }

  return (
    <div className="bg-white p-[25px] rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <form onSubmit={handleSubmit} className="w-full">
        <h2
          id="add-employee-heading"
          className="mb-[25px] text-[20px] font-bold text-[#333]"
        >
          Add Employee
        </h2>

        <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
          <label
            htmlFor="firstName"
            className="w-[170px] font-bold max-[768px]:mb-[6px]"
          >
            Enter First Name:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
          <label
            htmlFor="lastName"
            className="w-[170px] font-bold max-[768px]:mb-[6px]"
          >
            Enter Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
          <label
            htmlFor="email"
            className="w-[170px] font-bold max-[768px]:mb-[6px]"
          >
            Enter Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
          <label
            htmlFor="department"
            className="w-[170px] font-bold max-[768px]:mb-[6px]"
          >
            Enter Department:
          </label>
          <input
            id="department"
            type="text"
            name="department"
            required
            className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="mb-[18px] flex w-full items-center max-[768px]:flex-col max-[768px]:items-start">
          <label
            htmlFor="title"
            className="w-[170px] font-bold max-[768px]:mb-[6px]"
          >
            Enter Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            className="h-[40px] w-full flex-1 rounded-[5px] border border-[#ccc] px-[10px] outline-none transition focus:border-[#0078d4] focus:ring-2 focus:ring-[#0078d4]/20"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mt-[30px] flex w-full gap-[15px] max-[768px]:flex-col flex">
          <button
            type="submit"
            className="cursor-pointer rounded-[5px] border-0 bg-green-600 px-[18px] py-[10px] text-white transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#005fa3] focus:ring-offset-2 max-[768px]:w-full"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}
