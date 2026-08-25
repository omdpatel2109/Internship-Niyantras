import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                {/* Login */}
                <Route path="/login" element={ token ? (
                  <Navigate to="/dashboard" replace />
                    ) : (
                      <Login />
                    )}
                />

                  {/* Protected Dashboard */}
                  <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                />

                  {/* Unknown routes */}
                  <Route path="*" element={
                      <Navigate
                        to={token ? "/dashboard" : "/login"}
                        replace
                      />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}