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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    CircularProgress,

} from "@mui/material";
import { ArrowBack, Check, Close, Badge, ExpandMore, Key, Lock, Logout, Save } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { ifawfAdmin } from "../../_global/ifawf-api";
import { AuthContext } from "../Admin/Admin";


const accordionSX = {fontSize:'20px', fontWeight:'500'};


export default function Settings() {

    const navigation = useNavigate();

    const context = useOutletContext();

    const [updatedUsername, setUpdatedUsername] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');

    const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
    const [loadingUsernameUpdate, setLoadingUsernameUpdate] = useState(false);


    const [logoutDialog, setLogoutDialog] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const smallScreen = useMediaQuery('(max-width: 800px)');


    function onLogout() {
        //sign out functionality
        context.logout();
    }

    async function onSaveUsername() {
        //make async request to change the username.
        try {
            setLoadingUsernameUpdate(true);
            const usernameResponse = await ifawfAdmin.put('/admin-account', {
                username:updatedUsername
            },{params:{event:'username'}});
            setUpdateError(false);
            setCurrentPassword('');
            setUpdatedPassword('');
        } catch(error) {
            setUpdateError(true);
        } finally {
            setLoadingUsernameUpdate(false);
            setOpenSnackbar(true);
        }
    }


    async function onUpdatePassword() {
        try {
            setLoadingPasswordUpdate(true);
            const updateResponse = await ifawfAdmin.put('/admin-account',{
                newPassword:updatedPassword,
                oldPassword:currentPassword
            },{params:{event:'password'}});
            setUpdateError(false);
            setUpdatedUsername('');
        } catch(error) {
            setUpdateError(true);
        } finally {
            setLoadingPasswordUpdate(false);
            setOpenSnackbar(true);
        }
    }

    return (
        <>
            <div className="admin-settings-container">
            <Snackbar
                open={openSnackbar}
                onClose={()=> setOpenSnackbar(false)}
                autoHideDuration={4000}
                anchorOrigin={{horizontal:'center', vertical:'bottom'}}
            >
                {
                    updateError === true ? (
                        <Alert
                            severity="error"
                        >
                        Unable to perform action.
                        </Alert>
                    ):(
                        <Alert
                            severity="success"
                        >
                            Successfully updated Admin profile.
                        </Alert>
                    )
                }
            </Snackbar>
                <Dialog
                    open={logoutDialog}
                    onClose={()=> setLogoutDialog(false)}
                    fullWidth
                >
                    <DialogTitle>Are you sure you want to sign out?</DialogTitle>
                    <DialogContent>
                        This will requre you to sign back in.
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onLogout}
                            variant="contained"
                            color='error'
                        >
                            Logout
                        </Button>
                        <Button
                            variant="contained"
                            color='primary'
                            onClick={()=> setLogoutDialog(false)}

                        >
                            Actually, No
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box
                    component={Paper}
                    sx={{background:'#eee', margin:'0 auto'}}
                    padding={'10px'}
                    maxWidth={'1000px'}
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
                    <Typography fontFamily={'inherit'} fontSize={'16px'} marginTop={'10px'} fontWeight={500}>Use this page to manage the root admin account.</Typography>
                    <Accordion defaultExpanded>
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
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            <Badge/>
                                        </InputAdornment>
                                    ),
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
                                endIcon={ loadingUsernameUpdate === true ? <CircularProgress size={20} sx={{color:'var(--dark)'}}/> : <Save/>}
                                disabled={loadingUsernameUpdate || updatedUsername.trim() === ''}
                                onClick={onSaveUsername}
                            >
                                Change username
                            </Button>
                        </AccordionActions>
                    </Accordion>
                    <Accordion defaultExpanded>
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
                                    label="New Password"
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
                                endIcon={loadingPasswordUpdate ? <CircularProgress sx={{color:'var(--dark)'}} size={20}/> :<Check/>}
                                onClick={onUpdatePassword}
                                disabled={loadingPasswordUpdate || updatedPassword.trim() === '' || currentPassword.trim() == ''}
                            >
                                Change Password
                            </Button>
                        </AccordionActions>
                    </Accordion>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        marginTop={'20px'}
                    >
                        <Button
                            endIcon={<Logout/>}
                            onClick={()=> setLogoutDialog(true)}
                            variant="contained"
                            color="error"
                        >
                            Sign Out
                        </Button>
                    </Stack>
                </Box>
            </div>
            <Footer/>
        </>
    )
}