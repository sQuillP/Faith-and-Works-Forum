import "./styles/Unsubscribe.css";
import Navbar from "../_global/Navbar"
import Footer from "../_global/Footer"
import { Box, InputAdornment, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { Email } from "@mui/icons-material";
import { useParams, useSearchParams } from "react-router-dom";
import { ifawfClient } from "../_global/ifawf-api";

export default function Unsubscribe() {

    const [email, setEmail] = useState('');
    const [loadingEmail, setLoadingEmail] = useState();
    const [emailError, setEmailError] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);

    const [queryParams] = useSearchParams();


    async function sendUnsubscribeEmail() {
        try {
            await ifawfClient.post()
        } catch(error) {
            console.log('unable to send email')
            setEmailError(true);
        }
    }

    return (
        <div className="unsub-main">
            <Box component={Paper} elevation={3} height={'300px'} p={3}>
                <TextField
                    onChange={(e)=> setEmail(e.target.value)}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        )
                    }}
                    placeholder="John_doe@example.com"
                />
            </Box>
        </div>
    )
}