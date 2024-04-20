import { useState } from "react";
import "./styles/ResourceEmailForm.css";
import { Stack, Snackbar, Alert, CircularProgress } from "@mui/material";
import EmailField from "./EmailField";



const COOLDOWN_EMAIL_DURATION = 1000*60*3;

export default function ResourceEmailForm() {

    const [emailForm, setEmailForm] = useState({
        fullName:'',
        email:'',
        emailRequest: '',
    });

    const [sendingEmail, setSendingEmail] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cooldownMessage, setCooldownMessage] = useState('');




    async function sendEmail() {

        // Check if form has any empty values.
        if (Object.keys(emailForm).find(val => emailForm[val] == '')) {
            return;
        }

        // Check if email is valid
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForm.email) == false) {
            return;
        }

        // Check if user has already sent email in the past 3 minutes
        if (checkCooldown() === true) {
            setCooldownMessage("Please wait 3 minutes before sending another email.");
            return;
        }


        // Finally send the email and update the localstorage to cooldown for next k minutes.
        setCooldownMessage('');
        const date = new Date().getTime() + COOLDOWN_EMAIL_DURATION;
        localStorage.setItem("EMAIL_COOLDOWN", date.toString())
    }




    function checkCooldown() {
        const cooldown = localStorage.getItem('EMAIL_COOLDOWN');
        if (cooldown != null && Date.now() <= Number(cooldown)) {
            return true
        }
        return false
    }


    function handleChange(name, value) {
        setEmailForm({...emailForm, [name]:value});
    }
    
    
    return (
        <div className="ref-container">
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={()=> setSnackbarOpen(false)}
                anchorOrigin={{horizontal:'right', vertical:'top'}}
            >
                {
                    emailError === false ? (
                        <Alert
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Email sent successfully!
                        </Alert>
                    ): (
                        <Alert
                            severity='error'
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Unable to send email at this time.
                        </Alert>
                    )
                }
            </Snackbar>
            <div className="ref-header">
                <p className="text ref-header-txt">Have any questions? Feel free to reach out to us!</p>
            </div>
            <div className="ref-body">
                <EmailField 
                    value={emailForm.fullName} 
                    type="text"
                    label={"Full Name"}
                    name={'fullName'}
                    placeholder={'John Smith'}
                    onChange={(name, value)=>handleChange(name, value)}
                />
                <EmailField 
                    value={emailForm.email} 
                    label={"Email"}
                    type="email"
                    placeholder={'example@gmail.com'}
                    name={'email'}
                    onChange={(name,value)=> handleChange(name, value)}
                />
                <div className="ef-container">
                    <div className="ef-label">Message <span style={{color:'red'}}> *</span></div>
                    <textarea 
                        name="email-request-field"
                        className="_ref-email-request"
                        placeholder="What do you want us to know?"
                        value={emailForm.emailRequest}
                        onChange={(e)=> handleChange('emailRequest', e.target.value)}
                    ></textarea>
                </div>
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    paddingTop={'25px'}
                    gap={2}
                >
                    {cooldownMessage && (
                        <p className="text email-cooldown-text">
                            {cooldownMessage}
                        </p>
                    )}
                    <button 
                        className='ref-submit-email'
                        onClick={sendEmail}
                        disabled={sendingEmail}
                    >
                    {
                        sendingEmail ? (
                            <CircularProgress
                                size={20}
                                sx={{color:"#eee"}}
                            />
                        ):(
                            <>
                                Submit <i className="fa-regular fa-paper-plane"></i>
                            </>
                        )
                    }
                    
                    </button>
                </Stack>
            </div>
        </div>
    )
}