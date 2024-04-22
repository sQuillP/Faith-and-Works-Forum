import { Email, SupervisedUserCircleOutlined } from "@mui/icons-material";
import "./styles/CreateContactForm.css";
import { Divider, Typography, Box, Paper, TextField, Stack, InputAdornment, Button, CircularProgress } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import BadgeIcon from '@mui/icons-material/Badge';



export default function CreateContactForm({onCreateNewContact, creatingContact}) {

    const [contactForm, setContactForm] = useState({
        firstName:'',
        lastName:'',
        phone:'',
        email:''
    });

    const [formErrors, setFormErrors]= useState({});


    function handleChange(name, value) {
        setContactForm({...contactForm,[name]:value});
    }



    console.log(contactForm);
    function hasErrors() {
        return Object.keys(contactForm)
        .some(key => !!formErrors[key] || contactForm[key].trim() === '')
    }

    return (
        <Paper sx={{p:'20px'}} component={'div'} className="cf-main">
            <Box>
                <Typography fontSize={'30px'}>Create New Contact</Typography>
                <Divider sx={{mt:2, mb: 2}}/>
            </Box>
            <Stack
                direction={'column'}
                gap={3}
            >
                <TextField
                    label="First Name"
                    value={contactForm.firstName}
                    onChange={(e)=> handleChange('firstName',e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SupervisedUserCircleOutlined/>
                            </InputAdornment>
                        )
                    }}
                    required
                />                
                <TextField
                    label="Last Name"
                    value={contactForm.lastName}
                    onChange={(e)=> handleChange('lastName',e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BadgeIcon/>
                            </InputAdornment>
                        )
                    }}
                    required
                />  
                <MuiTelInput
                    size="small"
                    value={contactForm.phone}
                    onChange={(e)=> handleChange('phone', e)}
                    label="Phone"
                    defaultCountry='US'
                    required
                /> 
                <TextField
                    size="small"
                    value={contactForm.email}
                    onChange={(e)=> handleChange('email', e.target.value)}
                    label='Email'
                    required

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        )
                    }}
                      
                />
                <Button
                    fullWidth
                    onClick={onCreateNewContact}
                    variant='contained'
                    size="small"
                    disabled={creatingContact || hasErrors()}
                    sx={{textTransform:'unset'}}

                >
                {
                    creatingContact === true ? (
                        <CircularProgress size={20} sx={{color:'white'}}/>
                    ):(
                        <>
                            Create New Contact
                        </>
                    )
                }
                </Button>
            </Stack>
        </Paper>
    )


}