
import { Outlet } from "react-router-dom"
import { createContext, useContext, useState } from "react"


export const AuthContext = createContext(null)

export default function Admin() {

    const [token, setToken] = useState("DUMMY_TOKEN");

    async function login() {
        setToken("logged in");
    }

    async function logout() {

    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            <Outlet/>
        </AuthContext.Provider>
    )
}