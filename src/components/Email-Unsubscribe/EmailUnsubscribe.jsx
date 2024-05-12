import "./styles/EmailUnsubscribe.css";

import { useEffect, useState} from 'react'
import {ifawfDefault} from '../_global/ifawf-api';
import Navbar from '../_global/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../_global/Footer';
import { Box, Button, CircularProgress, Typography } from '@mui/material';



/**
 * TODO: User will click unsubscribe from an email that will redirect to this link, which will then tell the server that the
 * user no longer wants to subscribe to the email list.
 */


export default function EmailUnsubscribe() {

    const { subscriptionid } = useParams();

    const [loadingRequest, setLoadingRequest] = useState(true);
    const [errorUnsubscribe, setErrorUnsubscribe] = useState(false);

    const navigate = useNavigate();



    useEffect(()=> {
        ( async ()=> {
            try {
                const deleteResponse = await ifawfDefault.delete('/subscribers',{data:{ dateJoined:subscriptionid}})
            } catch(error) {
                console.log(error, 'unsubscribe error?');
                setErrorUnsubscribe(true);
            } finally {
                setLoadingRequest(false);
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
                        } else if(errorUnsubscribe === false) {
                            return (
                                <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                                    <Typography mb={3} variant="h5">You have successfully unsubscribed</Typography>
                                    <Button 
                                        variant="contained"
                                        sx={{
                                            ":hover":{ background:'var(--dark)'},
                                            background:'var(--dark)',
                                        }} 
                                        onClick={()=> navigate('/home')}
                                    >Back to Home</Button>
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