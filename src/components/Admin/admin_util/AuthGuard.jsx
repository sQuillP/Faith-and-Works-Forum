import { useContext } from "react"
import { AuthContext } from "../Admin/Admin"
import { Navigate } from "react-router-dom";



export default function AuthGuard({children}) {
    const context = useContext(AuthContext);
    if(!context.token) {
        return <Navigate to={'/admin/login'}/>
    }
    
    return children;
}