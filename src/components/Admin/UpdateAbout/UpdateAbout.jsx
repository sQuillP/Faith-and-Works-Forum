import { Box, Button, IconButton, Stack, TextField, Tooltip, Spinn, Snackbar, Alert, CircularProgress } from "@mui/material";
import "./styles/UpdateAbout.css";
import Footer from "../../_global/Footer";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DUMMY_ABOUT_DATA = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis accusamus porro enim beatae rerum dolore voluptates aut quas voluptate iusto harum excepturi expedita, magni quae ut corporis iste soluta molestias."


export default function UpdateAbout() {

    const navigate = useNavigate();
    const [aboutDescription, setAboutDescription] = useState(DUMMY_ABOUT_DATA);
    const [showNotification, setShowNotification] = useState(false);    
    const [showError, setShowError] = useState(false);
    const [updatingData, setUpdatingdata] = useState(true);


    /**
     * @description make async request to API and update the about page.
     */
    async function onSaveAboutChanges() {
        setShowNotification(true);
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