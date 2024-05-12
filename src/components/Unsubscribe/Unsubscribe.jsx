import "./styles/Unsubscribe.css";
import Navbar from "../_global/Navbar"
import Footer from "../_global/Footer"
import { Box, InputAdornment, InputLabel, Paper, TextField, Typography, Button, CircularProgress, useMediaQuery, Snackbar } from "@mui/material";
import { useState } from "react";
import { Email, EmailOutlined, EmailRounded } from "@mui/icons-material";
import { ifawfDefault } from "../_global/ifawf-api";

export default function Unsubscribe() {

    const [email, setEmail] = useState('');
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);


    const smallscreen = useMediaQuery('(max-width:500px)');



    async function sendUnsubscribeEmail() {
        try {
            setLoadingEmail(true);
            const notifyResponse = await ifawfDefault.post('/notify-subscribers',{
                "email":email
            },{
                params: {
                    type:'unsubscribe'
                }
            });
            console.log(notifyResponse)
            setEmailError(false);
            setSentEmail(true);
            setEmail('');

        } catch(error) {
            console.log('unable to send email')
            setEmailError(true);
        } finally {
            setLoadingEmail(false);
        }
    }

    function onResetForm() {
        setSentEmail(false);
        setEmailError(false);
        setLoadingEmail(false);
    }

    return (
        <>
            <Navbar/>
            <div className="unsub-main">
                <Box   
                    component={Paper} 
                    elevation={4} 
                    minHeight={'200px'} 
                    p={3} 
                    display={'flex'} 
                    justifyContent={sentEmail === true ? 'flex-start':'space-between'} 
                    alignItems={'center'}
                    flexDirection={'column'}
                >
                {
                    sentEmail === true ? (
                        <>
                            <Typography 
                                fontFamily={'inherit'} 
                                textAlign={'center'}
                                mb={3}
                                p={0}
                                fontSize={'30px'}
                            >Email has been sent</Typography>
                            <Typography 
                                fontFamily={'inherit'} 
                                textAlign={'center'}
                                mb={3}
                                p={0}
                                fontSize={'20px'}
                            >Please check your inbox to for unsubscribe link.</Typography>
                            <EmailOutlined sx={{fontSize:'60px'}}/>
                            <Button 
                                variant='contained' 
                                onClick={()=> setSentEmail(false)}
                                sx={{
                                ":hover":{
                                    background:"var(--dark)"
                                },
                                background:'var(--dark)'
                            }}>Send another email</Button>
                        </>
                    ):(
                    <>
                        <Typography textAlign={'center'} fontFamily={'inherit'} mb={3} p={0} variant="p" fontSize={smallscreen === true ? '25px':'30px'}>Unsubscribe From Email List</Typography>
                        {emailError && (<Typography color='crimson'>Unable to send email. Please check your network connection.</Typography>)}
                        <TextField
                            onChange={(e)=> setEmail(e.target.value)}
                            fullWidth
                            size={smallscreen === true ? 'small':'medium'}
                            type='email'
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="start">
                                        <Email/>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="John_doe@example.com"
                        />
                        <Button 
                            variant='contained' 
                            onClick={sendUnsubscribeEmail}
                            sx={{
                                background:'var(--dark)',
                                ":hover":  {
                                    background:'var(--dark)'
                                }
                            }}
                            endIcon={
                                loadingEmail === true && <CircularProgress size={20} sx={{color:'var(--dark)'}}/>
                            }
                            disabled={loadingEmail || email.trim() == ''}
                        >Unsubscribe</Button>
                    </>)
                    }
                </Box>
            </div>
            <Footer/>
        </>
    )
}