
import { Outlet } from "react-router-dom"
import { 
    createContext, 
    useContext, 
    useState,
} from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext(null)

export default function Admin() {

    const [token, setToken] = useState("asdf ")
    const navigate = useNavigate();

    async function login() {
        setToken("logged in");
        localStorage.setItem("AUTH_TOKEN", "logged in");
        // get 
        navigate('/admin/dashboard');
    }

    console.log(token);

    async function logout() {

    }

    return (
        <Outlet context={{token, login, logout}}/>
    )
}