import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    const access_token = localStorage.getItem("access_token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    access_token ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Login />
                    )
                  }
                />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

              </Routes>
        </BrowserRouter>
    );
}