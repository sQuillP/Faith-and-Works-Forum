import "./styles/ManageContacts.css";
import { useEffect, useState } from "react";
import Footer from "../../_global/Footer";

import ManageContactCard from "./ManageContactCard";
import CreateContactForm from "./CreateContactForm";

import { 
    Box, 
    Paper, 
    Typography, 
    Stack, 
    useMediaQuery, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button, 
    Tooltip, 
    IconButton, 
    Snackbar, 
    Alert, 
    CircularProgress 
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ifawfAdmin, ifawfClient } from "../../_global/ifawf-api";


export default function ManageContacts() {


    const [contactList, setContactList] = useState([]);
    const navigate = useNavigate();

    //Contact is being created
    const [creatingContact, setCreatingContact] = useState(false);

    //Deleting a contact.
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteContact, setDeleteContact] = useState({});

    //Updating contact
    const [updateContact, setUpdateContact] = useState(null);
    const [updatingContact, setUpdatingContact] = useState(false);

    //for snackbar functionality
    const [openSnackbar, setOpenSnackbar] = useState(false);

    //For when any CRUD update fails
    const [contactDBError, setContactDBError] = useState(false);
    const [loadingContacts, setLoadingContacts] = useState(false);
    const smallScreen = useMediaQuery('(max-width:800px)');


    useEffect(()=> {
        ( async ()=> {
            try {
                setLoadingContacts(true);
                const contactsResponse = await ifawfAdmin.get('/contacts')
                if(contactsResponse.data.status >= 400) {
                    throw new Error(contactsResponse.data.data);
                }
                setContactList(contactsResponse.data.data)
            } catch(error) {
                setContactDBError(true);
                setOpenSnackbar(true);
            } finally {
                setLoadingContacts(false);
            }
        })();
        
    },[]);


    

    // Use this function to show the popup window.
    function onRemoveContact(removeContactDetails) {
        setOpenDeleteDialog(true);
        setDeleteContact(removeContactDetails);
    }

    //Make Delete request and change UI accordingly for deleting contact.
    async function _removeContact(contact) {
        //remove the contact
        try{
            setUpdatingContact(true);
            setUpdateContact(contact)
            const contactDeleteResponse = await ifawfAdmin.delete('/contacts',{data:{email:contact.email}});
            if(contactDeleteResponse.data.status >=400) {
                throw new Error("invalid request");
            }
            setContactList(contactDeleteResponse.data.data);
            setContactDBError(false);//clear error
            setUpdatingContact(false);//clear loading animation
            setOpenSnackbar(true);//show success message
            setOpenDeleteDialog(false);//close the delete dialog
        } catch(error) {
            setContactDBError(true);//show error in update
            setOpenSnackbar(true);//Make sure that snackbar is open for error message
            setUpdatingContact(false);//remove update animation
        }
    }

    async function _createNewContact(newContact) {
        setCreatingContact(true);
        setTimeout(()=> setCreatingContact(false), 2000);
        try {
            // code
            const newContactResponse = await ifawfAdmin.post('/contacts',newContact);
            if(newContactResponse.data.status >= 400) {
                throw new Error("invalid request");
            }
            setContactList(newContactResponse.data.data);
            setContactDBError(false);
            setCreatingContact(false);
            setOpenSnackbar(true);
        } catch(error) {
            setContactDBError(true);
            setOpenSnackbar(true);
            setCreatingContact(false);
        }
    }


    // Make API request for updating contact.
    async function _updateContact(contact) {
        try {
            setUpdatingContact(true);
            setUpdateContact(contact);
            const contactResponse = await ifawfAdmin.put('/contacts',contact);
            if(contactResponse.data.status >=400) {
                throw new Error("invalid request");
            }
            setContactList(contactResponse.data.data);
            setContactDBError(false);
            setUpdatingContact(false);
            setOpenSnackbar(true);
        } catch(error) {
            setContactDBError(true);
            setOpenSnackbar(true);
            setUpdateContact(false);
        }
    }


    return (
        <>
            <div className="mc-main-container">
                <Dialog
                    open={openDeleteDialog}
                    onClose={()=> setOpenDeleteDialog(false)}
                    fullWidth
                >
                    <DialogTitle>
                        Delete Contact info
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Note that this action cannot be undone!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={()=> _removeContact(deleteContact)}
                            color="error"
                        >
                            Delete
                        </Button>
                        <Button
                            color='primary'
                            onClick={()=> setOpenDeleteDialog(false)}
                        >Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={()=>{ setOpenSnackbar(false)}}
                    anchorOrigin={{horizontal:'center', vertical:'bottom'}}
                >
                    {
                        contactDBError === true ? (
                            <Alert
                                severity="error"
                            >
                                Unable to perform update action. Please check internet connection or contact IT.
                            </Alert>
                        ) : (
                            <Alert
                                severity="success"
                            >
                                Data change successful!
                            </Alert>
                        )
                    }
                </Snackbar>
                <div className="mc-main-content">
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        gap={3}
                    >
                        <Tooltip title="Back to Dashboard">
                            <IconButton size="small" onClick={()=> navigate('/admin/dashboard')}>
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                        <Typography fontFamily={'inherit'} fontWeight={500} fontSize={ smallScreen ? '30px' : '35px'}>Manage Contacts</Typography>
                    </Stack>
                    <Typography sx={{mb:3}} fontFamily={'inherit'} fontWeight={500} fontSize={'16px'}>In this page you can manage your web page points of contact. Please note that these changes are reflected on the resources page.</Typography>
                    <Stack
                        gap={3}
                        direction={'row'}
                        alignItems={'flex-start'}
                        flexWrap={smallScreen ? 'wrap':'unset'}
                    >
                        <CreateContactForm
                            onCreateNewContact={_createNewContact}
                            creatingContact={creatingContact}

                        />
                        {
                            loadingContacts === true ? (
                                <Box width={'100%'} height={'100%'}>
                                    <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress sx={{color:'var(--dark)'}} size={80}/>
                                    </Stack>
                                </Box>
                            ):(
                                <Box width={'100%'}>
                                    {
                                        contactList.map(contact=> {
                                            return (
                                                <ManageContactCard 
                                                    updatingContact={updateContact?.email === contact.email && updatingContact=== true}
                                                    key={contact.email}
                                                    onUpdateContact={_updateContact} 
                                                    contact={contact}
                                                    onRemoveContact={onRemoveContact}
                                                />
                                            )
                                        })
                                    }
                                </Box>
                            )
                        }
                    </Stack>
                </div>
            </div>
            <Footer/>
        </>
    )
}