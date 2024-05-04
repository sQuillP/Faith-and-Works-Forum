import "./styles/ManageContacts.css";
import { useEffect, useState } from "react";
import Footer from "../../_global/Footer";

import ManageContactCard from "./ManageContactCard";
import CreateContactForm from "./CreateContactForm";

import { Box, Paper, Typography, Stack, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip, IconButton, Snackbar, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const DUMMY_CONTACTS = [
    {
        image:"/Michael_Froedge.jpg",
        firstName:'Michael',
        lastName:'Froedge',
        phone:'7655241482',
        email:'michaelfroedge1@gmail.com'
    },
    {
        image:"/Josh_Chudy.png",
        firstName:'Josh',
        lastName:'Chudy',
        phone:'8123409928',
        email:'jtchudy@gmail.com'
    }
]

export default function ManageContacts() {


    const [contactList, setContactList] = useState(DUMMY_CONTACTS);
    const navigate = useNavigate();

    //Contact is being created
    const [creatingContact, setCreatingContact] = useState(false);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteContact, setDeleteContact] = useState({});

    const [updateContact, setUpdateContact] = useState(null);
    const [updatingContact, setUpdatingContact] = useState(false);

    //for snackbar functionality
    const [openSnackbar, setOpenSnackbar] = useState(false);


    //For when any CRUD update fails
    const [contactDBError, setContactDBError] = useState(false);

    const smallScreen = useMediaQuery('(max-width:800px)');


    useEffect(()=> {
        
    },[]);


    function onUpdateContact(newContactDetails) {
        //Make async request to update the new contact details.
    }
    


    function onRemoveContact(removeContactDetails) {
        //make async request to remove contact details
        console.log('removing contact');
        setOpenDeleteDialog(true);
        setDeleteContact(removeContactDetails);
    }

    async function _removeContact() {
        //remove the contact
        console.log('removing', deleteContact)
    }

    async function _createNewContact(newContact) {
        console.log('creating new contact');
        setCreatingContact(true);
        setTimeout(()=> setCreatingContact(false), 2000);
    }



    async function _updateContact(contact) {
        setUpdatingContact(true);
        setUpdateContact(contact);
        setOpenSnackbar(true);
        setTimeout(()=> {
            setUpdatingContact(false);
        },2000);
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
                            onClick={_removeContact}
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
                    onClose={()=> setOpenSnackbar(false)}
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
                    </Stack>
                </div>
            </div>
            <Footer/>
        </>
    )
}