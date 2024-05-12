import { NotificationsNone } from "@mui/icons-material";
import { 
    DialogTitle,
    TextField,
    DialogContentText,
    Button,
    DialogContent,
    DialogActions,
    Dialog,
    CircularProgress
} from "@mui/material";
import { useState } from "react";
import { ifawfDefault } from "../_global/ifawf-api";


export default function AnnoyingPopup({
    open,
    onClose,
}) {

    const [subscribing, setSubscribing] = useState(false);
    const [successfulSubscription, setSuccessfulSubscription] = useState(false);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
            component: 'form',
            onSubmit: async (event) => {
                try {
                    event.preventDefault();
                    setSubscribing(true);
                    console.log(event.currentTarget);
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const subscriptionResponse = await ifawfDefault.post('/subscribers',{
                        ...formJson, 
                        dateJoined:new Date().getTime().toString()
                    },{
                        params: {
                            type:'all'
                        }
                    });
                    setSuccessfulSubscription(true);
                    console.log('successfully subscribed!')
                    console.log(subscriptionResponse);
                } catch(error) {
                    console.log('there was an error subscribing to the website.');
                }finally {
                    setSubscribing(false);
                }
          },
        }}
        >
            <DialogTitle fontFamily={'inherit'} textAlign={'center'} fontSize={'30px'}>{successfulSubscription === true ? "You have subscribed to Indy Faith And Work Forum!":"Subscribe to Indy Faith And Work Forum!"}</DialogTitle>
            {
                (()=> {
                    if(successfulSubscription === true) {
                        return (
                            <>

                                <DialogContent>
                                    <DialogContentText textAlign={'center'} fontFamily={'inherit'}>You will now be able to receive email notifications about upcoming events and news!</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button  onClick={onClose} variant="contained" sx={{background:'var(--dark)', color:"#eee", margin:'0 auto', ":hover":{background:"var(--dark)"}}}>Cool Beans</Button>
                                </DialogActions>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <DialogContent>
                                    <DialogContentText textAlign={'center'} fontFamily={'inherit'}>
                                        Receive regular updates and notifications,
                                        please enter your aforementioned details.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        autoComplete="off"
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        autoComplete="off"
                                        name="firstName"
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        autoComplete="off"
                                        name="lastName"
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button 
                                        onClick={onClose}
                                        variant="outlined"
                                        color="error"
                                    >Cancel</Button>
                                    <Button 
                                        disabled={subscribing}
                                        type="submit"
                                        variant="contained"
                                        sx={{ background:'var(--dark)'}}
                                        endIcon={ subscribing === false ? <NotificationsNone/> : <CircularProgress sx={{color:'var(--dark)'}} size={20}/> }
                                    >Subscribe</Button>
                                </DialogActions>
                            </>
                        )
                    }
                })()
            }
            
        </Dialog>
    )
}