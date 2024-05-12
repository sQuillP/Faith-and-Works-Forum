import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getDataBody } from "../_global/loaders/rootLoader";
import { Dialog } from "@mui/material";
import AnnoyingPopup from "../AnnoyingPopup/AnnoyingPopup";
import SubscribeButton from "../SubscribeButton/SubscribeButton";

// Initialize it with empty data body
const ClientDataContext = createContext(getDataBody());

/* Use this hook for displaying all dynamic data for the website. ALL of it! */
export const useClientData = ()=> useContext(ClientDataContext);

export default function ClientRoot() {

    const {about, contacts, gathering, links, error} = useLoaderData();
    const [showAnnoyingPopup, setShowAnnoyingPopup] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


    // Just make sure to navigate to /home if '/' is encountered. config is setup weird in index.js
    useEffect(()=> {
        if(location.pathname === '/') {
            navigate('/home');
        }
    },[location.pathname]);



    useEffect(()=> {
        const firstVisit = localStorage.getItem('INITIAL_VISIT');
        if(firstVisit === null) {
            setShowAnnoyingPopup(true);
        }
        localStorage.setItem("INITIAL_VISIT", true);
    },[])


    return (
        <>
            <ClientDataContext.Provider value={{about, contacts, gathering, links, error}}>
                <Outlet/>
                <AnnoyingPopup
                    open={showAnnoyingPopup}
                    onClose={()=> setShowAnnoyingPopup(false)}
                />
            </ClientDataContext.Provider>
            <SubscribeButton handleClick={()=> setShowAnnoyingPopup(true)}/>
        </>
    )

}