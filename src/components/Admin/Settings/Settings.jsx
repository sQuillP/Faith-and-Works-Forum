import "./styles/Settings.css";

import Footer from "../../_global/Footer"
import { 
    AccordionSummary, 
    Box, 
    IconButton, 
    Paper, 
    Stack, 
    Tooltip, 
    Typography, 
    useMediaQuery,
    Accordion,
    AccordionDetails,
    TextField,
    AccordionActions,
    Button,
    Divider,
    InputAdornment,

} from "@mui/material";
import { ArrowBack, Check, Close, ExpandMore, Key, Lock, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const accordionSX = {fontSize:'20px', fontWeight:'500'};


export default function Settings() {

    const navigation = useNavigate();

    const [updatedUsername, setUpdatedUsername] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');

    const smallScreen = useMediaQuery('(max-width: 800px)');



    async function onSaveUsername() {
        //make async request to change the username.
    }

    return (
        <>
            <div className="admin-settings-container">
                <Box
                    component={Paper}
                    sx={{background:'#eee', margin:'0 auto'}}
                    padding={'10px'}
                    maxWidth={'1500px'}
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        gap={3}
                    >
                        <Tooltip title="Back to Dashboard">
                            <IconButton onClick={()=> navigation('/admin/dashboard')}>
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                        <Typography  fontFamily={'inherit'} fontSize={'35px'} fontWeight={500}>Settings</Typography>
                    </Stack>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            sx={accordionSX}

                        >
                            Change Username
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                value={updatedUsername}
                                onChange={(e)=> setUpdatedUsername(e.target.value)}
                                label={"Change Username"}
                                size="small"
                                InputProps={{
                                    endAdornment: updatedUsername.trim() !== '' && (
                                        <IconButton size="small" onClick={()=> setUpdatedUsername('')}>
                                            <Close  fontSize={"15px"}/>
                                        </IconButton>
                                    )
                                }}
                            />
                        </AccordionDetails>
                        <AccordionActions>
                            <Button
                                endIcon={<Save/>}
                                disabled={updatedUsername.trim() === ''}
                                onClick={onSaveUsername}
                            >
                                Save Changes
                            </Button>
                        </AccordionActions>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            sx={accordionSX}
                        >
                            Change Password
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack
                                direction='column'
                                justifyContent={'flex-start'}
                                alignItems={'flex-start'}
                                gap={3}
                            >
                                <TextField
                                    value={currentPassword}
                                    onChange={(e)=> setCurrentPassword(e.target.value)}
                                    size="small"
                                    label="Current Password"
                                    type="password"
                                    InputProps={{
                                        startAdornment:(
                                            <InputAdornment position="start">
                                                <Key/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: currentPassword.trim() !== '' && (
                                            <InputAdornment position="end">
                                                <IconButton onClick={()=> setCurrentPassword('')} size="small">
                                                    <Close fontSize="15px"/>
                                                </IconButton>
                                            </InputAdornment>

                                        )
                                    }}
                                />
                                <TextField
                                    value={updatedPassword}
                                    onChange={(e)=> setUpdatedPassword(e.target.value)}
                                    size="small"
                                    type="password"
                                    label="Updated Password"
                                    InputProps={{
                                        startAdornment:(
                                            <InputAdornment position="start">
                                                <Lock/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: updatedPassword.trim() !== '' && (
                                            <InputAdornment position="end">
                                                <IconButton onClick={()=> setUpdatedPassword('')} size="small">
                                                    <Close fontSize="15px"/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button
                                color="success"
                                endIcon={<Check/>}
                                disabled={updatedPassword.trim() === '' || currentPassword.trim() == ''}
                            >
                                Change Password
                            </Button>
                        </AccordionActions>
                    </Accordion>
                </Box>
            </div>
            <Footer/>
        </>
    )
}