import { Box, Button, IconButton, Stack, TextField, Tooltip, Spinn, Snackbar, Alert, CircularProgress } from "@mui/material";
import "./styles/UpdateAbout.css";
import Footer from "../../_global/Footer";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ifawfAdmin } from "../../_global/ifawf-api";


export default function UpdateAbout() {



    const navigate = useNavigate();
    const [aboutDescription, setAboutDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);    
    const [showError, setShowError] = useState(false);
    const [updatingData, setUpdatingdata] = useState(false);


    // Remember to use abortcontroller?
    useEffect(()=> {
        (async ()=> {
            try {
                const aboutResponse = await ifawfAdmin.get('/about');
                if(aboutResponse.data.status >= 400) {
                    throw new Error("Invalid api call");
                }
                setAboutDescription(aboutResponse.data.data);
            } catch(error) {
                console.log(error.message);
                setShowError(true);
                setShowNotification(true);
            }
        })();
    },[]);

    /**
     * @description make async request to API and update the about page.
     */
    async function onSaveAboutChanges() {
        try {
            setUpdatingdata(true);
            const updateAboutResponse = await ifawfAdmin.put('/about',{about:aboutDescription});
            setAboutDescription(updateAboutResponse.data.data);
            setShowNotification(true);
        } catch(error) {
            setShowNotification(true);
            setShowError(true);
        } finally {
            setUpdatingdata(false);
        }
    }

    return (
        <>

            <div className="ua-main-container">
                <Snackbar
                    open={showNotification}
                    autoHideDuration={4000}
                    anchorOrigin={{vertical:'bottom', horizontal:'center'}}
                    onClose={()=> setShowNotification(false)}
                >
                {
                    showError === false ? (
                        <Alert
                            severity="success"
                        >
                            Successfully Updated About Page!
                        </Alert>
                    ): (
                        <Alert
                            severity='error'
                        >
                            Unable to update About Page. Check connection or reach out to IT.
                        </Alert>
                    )
                }
                </Snackbar>
                <div className="ua-content-container">
                    <Box sx={{m: 3}}>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            sx={{m:2}}
                            gap={2}
                            flexWrap={'wrap'}
                        >
                            <Tooltip title="Back to Dasboard">
                                <IconButton onClick={()=> navigate('/admin/dashboard')}>
                                    <ArrowBack fontSize='medium'/>
                                </IconButton>
                            </Tooltip>
                            <p className="text ua-main-header">Update About Page</p>
                            <div></div>
                        </Stack>
                        <p className="text ui-main-description">Any changes made in here will reflect what is written in the about page.</p>
                    </Box>
                    <TextField
                        multiline
                        label="Page Description"
                        value={aboutDescription}
                        onChange={(e)=> setAboutDescription(e.target.value)}
                        fullWidth={true}
                        rows={10}
                    />
                    <Stack 
                        justifyContent={'flex-end'}
                        direction={'row'}
                        padding={'20px 0'}
                    >
                        <Button
                            onClick={onSaveAboutChanges}
                            variant='contained'
                            color="success"
                            sx={{textTransform:'none'}}
                            disabled={updatingData}
                            endIcon={updatingData && <CircularProgress size={20} sx={{color:'white'}}/>}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </div>
            </div>
            <Footer/>
        </>
    );
}