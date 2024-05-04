import { createContext, useContext, useEffect } from "react";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getDataBody } from "../_global/loaders/rootLoader";


// Initialize it with empty data body
const ClientDataContext = createContext(getDataBody());

/* Use this hook for displaying all dynamic data for the website. ALL of it! */
export const useClientData = ()=> useContext(ClientDataContext);

export default function ClientRoot() {

    const {about, contacts, gathering, links, error} = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();


    // Just make sure to navigate to /home if '/' is encountered. config is setup weird in index.js
    useEffect(()=> {
        if(location.pathname === '/') {
            navigate('/home');
        }
    },[location.pathname]);


    return (
        <>
            <ClientDataContext.Provider value={{about, contacts, gathering, links, error}}>
                <Outlet/>
            </ClientDataContext.Provider>
        </>
    )

}