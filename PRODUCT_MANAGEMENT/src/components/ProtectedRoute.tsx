import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}