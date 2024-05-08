
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

    const [token, setToken] = useState('')
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


    async function logout() {
        setToken('');
        localStorage.removeItem("TOKEN");
        navigate('/admin/login');
    }

    return (
        <Outlet context={{token, login, logout}}/>
    )
}