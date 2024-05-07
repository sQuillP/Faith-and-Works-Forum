import {
     Dialog, 
     DialogTitle,
    Button, 
    DialogContent, 
    Stack, 
    TextField, 
    InputAdornment, 
    IconButton,
    DialogActions,
    Snackbar,
    Alert,
    Tooltip,
    CircularProgress
    } from "@mui/material";
import { useState } from "react";
import TitleIcon from '@mui/icons-material/Title';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CloseIcon from '@mui/icons-material/Close';
import { ifawfAdmin } from "../../_global/ifawf-api";

export default function CreateAdminLink({open, loading, updateLinks, linkData, update=false}) {

    const [linkTitle, setLinkTitle] = useState(update === true?linkData.title:'');
    const [link, setLink] = useState(update === true?linkData.link:"");

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showError, setShowError] = useState(false);

    const [updatingLink, setUpdatingLink] = useState(false);

    async function addLink() {
        try {
            setUpdatingLink(true);
            // Make post request to aws
            // Fetch updated list of links that are saved.
            // call update links
            let linkResponse = null;
            if(update===true) {
                // console.log('updating link');
                linkResponse = await ifawfAdmin.put('/links',{title: linkTitle, link});
            } else {
                linkResponse = await ifawfAdmin.post('/links', {title: linkTitle, link});
            }
            console.log(linkResponse);
            if(linkResponse.data.status >= 400) {
                setShowError(true);
            } else {
                console.log(linkResponse.data.data);
                updateLinks(linkResponse.data.data);
                setShowError(false);
            }
        } catch(error) {
            console.log('in error catch',error.message);
            setShowError(true);
            // 
        } finally {
            console.log("showing snackbar");
            setShowSnackbar(true);
            setUpdatingLink(false);
        }
    }

    function handleClose() {

    }
    

    function displayAdornment(text, type) {
        if(text === '') {
            return;
        }
        return (
            <InputAdornment position='end'>
                <Tooltip title="Clear field">
                    <IconButton onClick={()=> type==='linkTitle' ? setLinkTitle(''):setLink('')}>
                        <CloseIcon/>
                    </IconButton>
                </Tooltip>
            </InputAdornment>
        )

    }

    return (
        <Dialog
            open={open}
            onClose={()=> updateLinks(null)}
            fullWidth
        >
            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={()=> setShowSnackbar(false)}
                anchorOrigin={{horizontal:'center', vertical:'bottom'}}
            >
            {
                showError === true ? (
                    <Alert
                        severity='error'
                    >
                        Unable to perform action. Check your connection or contact IT.
                    </Alert>
                ): (
                    <Alert
                        severity="success"
                    >
                        Successfully updated links! Changes have been reflected.
                    </Alert>
                )
            }

            </Snackbar>
            <DialogTitle>{update?"Edit Link":"Create new Link"}</DialogTitle>
            <DialogContent dividers sx={{padding: '30px 20px 40px 20px'}}>
                <Stack
                    direction={'column'}
                    gap={5}
                    alignItems={'flex-start'}
                    justifyContent={'flex-start'}
                >
                    <TextField
                        size="small"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <TitleIcon />
                            </InputAdornment>
                            ),
                            endAdornment: displayAdornment(linkTitle,'linkTitle')
                        }}
                        onChange={(e)=> setLinkTitle(e.target.value)}
                        value={linkTitle}
                        fullWidth
                        placeholder="e.g: 10 Important Bible Verses for Your Daily Life."
                        label="Link Title"
                    />
                    <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <InsertLinkIcon />
                            </InputAdornment>
                            ),
                            endAdornment:  displayAdornment(link, 'link')
                        }}
                        onChange={(e)=> setLink(e.target.value)}
                        value={link}
                        placeholder="https://www.google.com/"
                        label="Site Link"
                    />
                    {/* <Tooltip 
                        
                        title="Verify link is not broken">
                        <Button
                            onClick={()=> window.open(link)}
                            variant='outlined'
                            color='warning'
                            size="small"
                            sx={{margin: '0 auto'}}
                        >
                            Validate Link
                        </Button>
                    </Tooltip> */}
                </Stack>
            </DialogContent>
            <DialogActions>
                    <Button
                        // variant="filled"
                        disabled={updatingLink}
                        onClick={addLink}
                        variant='outlined'
                        color="primary"
                        endIcon={updatingLink && <CircularProgress sx={{color:'var(--dark)'}} size={20}/>}
                        sx={{textTransform:'unset'}}
                    >
                        {update?"Update Link":"Add Link"}
                    </Button>
                    <Button
                        disabled={updatingLink}
                        variant="outlined"
                        color="error"
                        sx={{textTransform:'unset'}}
                        onClick={()=> updateLinks(null)}
                    >
                    Cancel
                    </Button>
            </DialogActions>
        </Dialog>
    )
}