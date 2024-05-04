
import { Outlet, useLocation } from "react-router-dom"
import { 
    createContext, 
    useContext, 
    useEffect, 
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ifawfClient } from "../../_global/ifawf-api";


export const AuthContext = createContext(null)

export default function Admin() {

    const [token, setToken] = useState("asdf ")
    const location = useLocation();
    const navigate = useNavigate();

    async function login(token) {
        setToken(token);
        localStorage.setItem("TOKEN",token);
        navigate('/admin/dashboard');
    }

    useEffect(()=> {
        if(location.pathname === '/admin'){
            navigate('/admin/login');
        }
    },[location.pathname])

    console.log(token);

    async function logout() {
        localStorage.removeItem("TOKEN");
    }

    return (
        <Outlet context={{token, login, logout}}/>
    )
}