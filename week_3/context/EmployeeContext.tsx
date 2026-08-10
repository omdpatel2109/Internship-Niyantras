"use client";
import React, { createContext, useContext, useState } from "react";
import useEmployees from '@/hooks/Employee';
import type { Employee } from "@/components/type";
import type { ReactNode } from "react";

    // passing lots of props becomes prop drilling, so make a context and pass it through the children of the provider, 
    // so that all the children can access the data without prop drilling
    type EmployeeContextType = {
    employees: Employee[];
    filteredEmployees: Employee[];

    filterDepartment: string;
    setFilterDepartment: React.Dispatch<React.SetStateAction<string>>; // It takes a generic type parameter that specifies the type of the state value being updated. In this case, it is a string.

    searchEmp: string;
    setSearchEmp: React.Dispatch<React.SetStateAction<string>>;

    addEmployee: (employee: Employee) => void;
    removeEmployees: () => void;
    fetchEmployees: () => void;

    searchEmployee: () => void;
    removeSearch: () => void;

    sortField: string;
    setSortField: React.Dispatch<React.SetStateAction<string>>;
    sortEmployees: (field: string) => void;

    loading: boolean;

    };

    const EmployeeContext = createContext<EmployeeContextType | null>(null);

    type Props = {
    children: ReactNode; //render anything
    };

    export function EmployeeProvider({ children }: Props) {
    const employeeData = useEmployees();

    return (
        <EmployeeContext.Provider value={employeeData}> {/*employeeData available to all components inside the provider*/}
        {children}                                    {/* renders whatever that you put in this through provider */}
        </EmployeeContext.Provider>
    );
    }

    export function useEmployeeContext() {
    // const employeeData = useEmployees();
    const context = useContext(EmployeeContext); 

    if (!context) {
        throw Error(
        "useEmployeeContext must be used inside EmployeeProvider"
        );
    }

    return context;
    }
