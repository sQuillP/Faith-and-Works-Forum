import { Email, SupervisedUserCircleOutlined } from "@mui/icons-material";
import "./styles/CreateContactForm.css";
import { Divider, Typography, Box, Paper, TextField, Stack, InputAdornment, Button, CircularProgress, useMediaQuery } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import BadgeIcon from '@mui/icons-material/Badge';

const INITIAL_CONTACT_FORM = {
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    image:''
}

export default function CreateContactForm({onCreateNewContact, creatingContact}) {

    const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);

    const [formErrors, setFormErrors]= useState({});

    const smallScreen = useMediaQuery('(max-width: 850px)');
    


    function handleChange(name, value) {
        setContactForm({...contactForm,[name]:value});
    }



    function hasErrors() {
        return Object.keys(contactForm)
        .some(key => (!!formErrors[key] || contactForm[key].trim() === '' )&& key !== 'image')
    }


    function handleCreateContact() {
        onCreateNewContact(contactForm);
        setContactForm(INITIAL_CONTACT_FORM);
    }

    return (
        <Paper sx={{p:'20px', width: smallScreen === false ? '450px' : '100%'}} component={'div'} elevation={3} className="cf-main">
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
                    autoComplete='off'
                    required
                />  
                <MuiTelInput
                    size="small"
                    value={contactForm.phone}
                    onChange={(e)=> handleChange('phone', e)}
                    label="Phone"
                    defaultCountry='US'
                    required
                    autoComplete='off'

                /> 
                <TextField
                    size="small"
                    value={contactForm.email}
                    onChange={(e)=> handleChange('email', e.target.value)}
                    label='Email'
                    required
                    autoComplete='off'

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
                    onClick={handleCreateContact}
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