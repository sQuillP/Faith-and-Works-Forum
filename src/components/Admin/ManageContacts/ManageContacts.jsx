import "./styles/ManageContacts.css";
import { useEffect, useState } from "react";
import Footer from "../../_global/Footer";

import ManageContactCard from "./ManageContactCard";
import CreateContactForm from "./CreateContactForm";

import { Box, Paper, Typography, Stack, useMediaQuery } from "@mui/material";
const DUMMY_CONTACTS = [
    {
        image:"/Michael_Froedge.jpg",
        firstName:'Michael',
        lastName:'Froedge',
        contactDetails: [
            {
                type:"Phone",
                value:'7655241482'
            },
            {
                type:'Email',
                value:'michaelfroedge1@gmail.com'
            }
        ]
    },
    {
        image:"/Josh_Chudy.png",
        firstName:'Josh',
        lastName:'Chudy',
        contactDetails: [
            {
                type:"Phone",
                value:'8123409928'
            },
            {
                type:'Email',
                value:'jtchudy@gmail.com'
            }
        ],
        
    }
]

export default function ManageContacts() {


    const [contactList, setContactList] = useState(DUMMY_CONTACTS);

    const [creatingContact, setCreatingContact] = useState(true);

    const [updateContact, setUpdateContact] = useState(null);
    const [removeContact, setRemoveContact] = useState(null);

    const smallScreen = useMediaQuery('(max-width:800px)');


    useEffect(()=> {
        
    },[]);


    function onUpdateContact(newContactDetails) {
        //Make async request to update the new contact details.
    }
    


    function onRemoveContact(removeContactDetails) {
        //make async request to remove contact details
    }

    async function _removeContact() {

    }

    async function _createNewContact(newContact) {
        console.log('creating new contact');
    }

    async function _updateContact() {

    }


    return (
        <>
            <div className="mc-main-container">
                <div className="mc-main-content">

                    <Typography fontFamily={'inherit'} fontSize={'30px'}>Manage Contacts</Typography>
                    <Stack
                        gap={3}
                        direction={'row'}
                    >
                        <CreateContactForm
                            onCreateNewContact={_createNewContact}
                            creatingContact={creatingContact}

                        />
                        <Box component={Paper}>
                            {
                                contactList.map(contact=> {
                                    return (
                                        <ManageContactCard 
                                            key={contact.contactDetails[0].value}
                                            onUpdateContact={onUpdateContact} 
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