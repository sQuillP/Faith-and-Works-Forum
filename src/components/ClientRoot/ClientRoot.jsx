import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getDataBody } from "../_global/loaders/rootLoader";
import { Box, Button, Dialog, Typography } from "@mui/material";
import AnnoyingPopup from "../AnnoyingPopup/AnnoyingPopup";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import { ifawfClient } from "../_global/ifawf-api";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { WifiTetheringError, X } from "@mui/icons-material";

// Initialize it with empty data body
const ClientDataContext = createContext(getDataBody());

/* Use this hook for displaying all dynamic data for the website. ALL of it! */
export const useClientData = ()=> useContext(ClientDataContext);

export default function ClientRoot() {


    const [siteData, setSiteData] = useState(getDataBody());
    const [showAnnoyingPopup, setShowAnnoyingPopup] = useState(false);
    const [loadingPageData, setLoadingPageData] = useState(true);
    const [loadingError, setLoadingError] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);


    const navigate = useNavigate();
    const location = useLocation();


    /**
     * Description: Load all site resources before rendering page content.
     */
    useEffect(()=> {
        ( async ()=> {
            try {
                setLoadingProgress(25)
                const about = await ifawfClient.get('/about');
                setLoadingProgress(50);
                const gathering = await ifawfClient.get('/gathering');
                setLoadingProgress(75);
                const contacts = await ifawfClient.get('/contacts');
                setLoadingProgress(95);
                const links = await ifawfClient.get('/links');
                setLoadingProgress(100);

                setSiteData({about, gathering, contacts, links});
                setLoadingError(false);
            } catch(error) {
                setLoadingError(true);
            } finally {
                setLoadingPageData(false);
            }
        })();
    },[]);


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
            {
                (()=> {
                    if(loadingPageData === true) {
                        return (
                            <Box 
                                height={'100vh'} 
                                width={'100vw'} 
                                sx={{background:'white'}}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection={'column'}
                            >
                                <CircularProgressWithLabel  value={loadingProgress}/>
                                <Typography fontFamily={'inherit'} mt={2}>Loading Site resources...</Typography>
                            </Box>
                        )
                    } else if(loadingError === true) {
                        return (
                            <Box 
                                height={'100vh'} 
                                width={'100vw'} 
                                sx={{background:'white'}}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection={'column'}
                            >
                                <WifiTetheringError sx={{fontSize:'60px'}}/>
                                <Typography fontSize={'20px'} margin={'20px 0'} fontFamily={'inherit'}>Error fetching site data. Please check your internet connection.</Typography>
                                <Button  variant="contained" sx={{background:'var(--dark)', ":hover":{background:"var(--dark)"}}}>Retry</Button>
                            </Box>
                        )
                    } else {
                        const {about, contacts, gathering, links} = siteData;
                        return (
                            <>
                                <ClientDataContext.Provider value={{about, contacts, gathering, links}}>
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
                })()
            }
        </>
    )

}