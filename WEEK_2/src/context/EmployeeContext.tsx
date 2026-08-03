import React, { createContext, useContext, useState } from "react";
import useEmployees from '../hooks/Employee';
// import {Employee} from '../components/EmployeeSystem';
import type { Employee } from "../components/type";
import type { ReactNode } from "react";


type EmployeeContextType = {
  employees: Employee[];
  filteredEmployees: Employee[];
  filterDepartment: string;
  setFilterDepartment: React.Dispatch<React.SetStateAction<string>>;

  addEmployee: (employee: Employee) => void;
  removeEmployees: () => void;
  fetchEmployees: () => void;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

type Props = {
  children: ReactNode; //render anything
};

export function EmployeeProvider({ children }: Props) {
  const employeeData = useEmployees();

  return (
    <EmployeeContext.Provider value={employeeData}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  const employeeData = useEmployees();
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error(
      "useEmployeeContext must be used inside EmployeeProvider"
    );
  }

  return context;
}
