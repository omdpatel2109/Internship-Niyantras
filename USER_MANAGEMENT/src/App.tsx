import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserManagement from "./components/UserManagement";
import AllDetails from "./components/AllDetails";
import { UserProvider } from "./context/UserContext";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<UserManagement />} />
                    <Route path="/AllDetails/:id" element={<AllDetails />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;