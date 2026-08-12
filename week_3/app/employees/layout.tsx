"use client";

import { EmployeeProvider } from "@/context/EmployeeContext";
import type { ReactNode } from "react";

export default function EmployeesLayout({ children }: { children: ReactNode }) {
  return <EmployeeProvider>{children}</EmployeeProvider>;
}
