import "./styles/EmailUnsubscribe.css";

import { useEffect, useState} from 'react'
import {ifawfClient} from '../_global/ifawf-api';
import Navbar from '../_global/Navbar';
import { useParams, useSearchParams } from 'react-router-dom';
import Footer from '../_global/Footer';
import { Box, CircularProgress, Typography } from '@mui/material';



/**
 * TODO: User will click unsubscribe from an email that will redirect to this link, which will then tell the server that the
 * user no longer wants to subscribe to the email list.
 */


export default function EmailUnsubscribe() {

    const { subscriptionid } = useParams();
    const [queryParams] = useSearchParams();
    console.log(queryParams.get('subtype'))


    console.log(subscriptionid);

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [errorUnsubscribe, setErrorUnsubscribe] = useState(false);


    useEffect(()=> {
        ( async ()=> {
            try {
                // setLoadingRequest(true);
                console.log("working")
            } catch(error) {
                console.log(error);
                console.log('not working');
                setErrorUnsubscribe(true);
            } finally {
                // setLoadingRequest(false);
            }
        })();
    },[]);


    return (
        <>
            <Navbar/>
            <div className="eu-main">
                {
                    (()=> {
                        if(loadingRequest === true) {
                            return (
                                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                    <CircularProgress size={80} sx={{color:'var(--dark)'}}/>
                                    <Typography variant="h4" m={2}>Unsubscribing...</Typography>
                                </Box>
                            )
                        } else if(errorUnsubscribe === true) {
                            return (
                                <Box>
                                    <Typography variant="h5">You have successfully unsubscribed</Typography>
                                </Box>
                            )
                        } else {
                            return (
                                <Box>
                                    <Typography variant="h5">Error unsubscribing. Please refresh the page or check your internet connection.</Typography>
                                </Box>
                            )
                        }
                    })()
                }
            </div>
            <Footer/>
        </>
    );
}