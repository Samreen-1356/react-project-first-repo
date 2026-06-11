import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/users?limit=50").then((res) => {
            setUsers(res.data.users);
        });
    }, []);

    const addUser = (newUser) => {
        setUsers((prev) => [
            ...prev,
            {
                ...newUser,
                id: Date.now(),
            },
        ]);
    };

    const deleteUser = (id) => {
        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    };

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                addUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;