"use client";

import { EmployeeProvider } from "@/context/EmployeeContext";
import type { ReactNode } from "react";

export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeProvider>{children}</EmployeeProvider>;
}
