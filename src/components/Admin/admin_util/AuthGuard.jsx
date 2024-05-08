import {useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

/**
 * @description Ensure that users accessing children props have proper authentication
 * i.e a token that is not null. Otherwise use will be redirected back to the login screen.
 * @returns 
 */
export default function AuthGuard({children}) {
    const context = useOutletContext();

    useEffect(()=> {
        // console.log('context token is ', context.token);
    },[context.token]);

    if(!context.token) {
        return <Navigate to={'/admin/login'}/>
    }
    
    return children;
}