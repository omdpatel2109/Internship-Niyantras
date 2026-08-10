import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";

type UserContextType = ReturnType<typeof useUser>;

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userData = useUser();

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used inside UserProvider");
    }

    return context;
}