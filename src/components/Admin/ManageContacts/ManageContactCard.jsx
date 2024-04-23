import { Close, Delete, Edit, Email, Image, Padding, Visibility, Badge, Phone } from "@mui/icons-material";
import { 
    Avatar, 
    Card, 
    CardActions, 
    CardContent, 
    IconButton, 
    Tooltip, 
    Stack ,
    Box,
    TextField,
    InputAdornment,
    Typography,
    Button,
    CircularProgress,
    colors,
} from "@mui/material";
import { useState } from "react";
import { formatPhone } from "../../_global/utils";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MuiTelInput } from "mui-tel-input";


export default function ManageContactCard({contact,updatingContact,  onUpdateContact, onRemoveContact}) {

    const [editMode, setEditMode] = useState(false);
    const [contactData, setContactData] = useState({
        firstName:contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone:contact.phone,
        image:contact.image
    });

    const renderForm = [
        {
            name:"firstName",
            label:"First Name",
            Icon: ()=> <AccountCircleIcon/>
        },
        {
            name:"lastName",
            label:"Last Name",
            Icon: ()=> <Badge/>
        },
        {
            name:"email",
            label:"Email",
            Icon: ()=> <Email/>
        },
        {
            name:'phone',
            label:"Phone",
            Icon: ()=> <Phone/>
        },
        {
            name:"image",
            label:"Profile Image",
            Icon: ()=> <Image/>
        },
    ];

    function handleChange(name, value) {
        setContactData({...contactData, [name]:value});
    }


    //Changing from view->edit, Make sure that data is not changed unless done by API call, not handled
    //in this component.
    function onChangeView() {
        setContactData({...contact});
        setEditMode(!editMode);
    }

    const typSX = {
        fontFamily: 'inherit',
        margin:0,
        padding:0
    }


    return (
        <Card sx={{p:2,paddingTop:5, paddingBottom:'0', boxSizing:'border-box',margin:'10px 0', width:'100%',  position:'relative'}} elevation={3}>
            <CardContent sx={{p: 1, paddingBottom:'20px', borderBottom:'1px solid #eee'}}>
                <Stack
                    direction="row"
                    alignItems={'flex-start'}
                    gap={3}
                >
                    <Box>
                        <Avatar 
                            sx={{height: '100px', width:'100px'}}
                            alt={contact.firstName + " " + contact.lastName}
                            src={contact.image}
                        />
                    </Box>
                    <Stack
                        gap={editMode ? 3: 1}
                        width={'100%'}
                    >
                        {
                            editMode === true ? renderForm.map(FormItem=> {

                                if(FormItem.name === 'phone') {
                                    return (
                                        <MuiTelInput
                                            key={FormItem.name}
                                            size="small"
                                            label={FormItem.label}
                                            value={contactData[FormItem.name]}
                                            onChange={(e)=> handleChange(FormItem.name,e)}
                                            fullWidth
                                            defaultCountry="US"
                                        />
                                    )
                                }
                                return (
                                        <TextField
                                            key={FormItem.name}
                                            size="small"
                                            label={FormItem.label}
                                            value={contactData[FormItem.name]}
                                            onChange={(e)=> handleChange(FormItem.name,e.target.value)}
                                            fullWidth
                                            InputProps={{
                                                startAdornment:(
                                                    <InputAdornment position='start'>
                                                        <FormItem.Icon/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                )
                            }) : (
                                <>
                                    <Typography sx={{...typSX, fontSize:'20px', fontWeight:'bold'}}>{contactData.firstName +" " + contactData.lastName}</Typography>
                                    <Typography sx={typSX}> <i className="fa-solid fa-phone" style={{marginRight:'10px'}}></i> {formatPhone(contactData.phone)}</Typography>
                                    <Typography sx={typSX}><i className="fa-solid fa-envelope" style={{marginRight:'10px'}}></i>{contactData.email}</Typography>
                                </>
                            )
                        }
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions
              sx={{justifyContent:'flex-end', p: 1}}  
            >
                {
                    editMode === true && (
                        <Box component={'div'}>
                            <Button
                                disabled={updatingContact}
                                onClick={()=> onUpdateContact(contactData)}
                                endIcon={updatingContact && <CircularProgress size={20} color='primary'/>}
                            >
                                {updatingContact  ? "Saving":"Save Changes"}
                            </Button>
                        </Box>
                    )
                }

                <Box component={'div'}>
                    <Tooltip 
                        title={editMode ? "Change to View Mode": "Update Contact Details"}
                        
                    >
                        <IconButton size="small" onClick={onChangeView}>
                        { 
                            editMode === true ? <Visibility/> : <Edit/>
                        }
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete Contact"}>
                        <IconButton size="small" onClick={()=> onRemoveContact(contact)}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </Box>

            </CardActions>
        </Card>
    )
}