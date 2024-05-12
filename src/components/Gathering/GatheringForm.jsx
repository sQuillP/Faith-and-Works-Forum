import "./styles/GatheringForm.css";
import { useState } from "react"
import GatheringFormField from "./GatheringFormField";
import { CircularProgress, Stack, useMediaQuery, Box, Typography } from "@mui/material";
import CelebrationIcon from '@mui/icons-material/Celebration';
import { ifawfDefault } from "../_global/ifawf-api";
import { useClientData } from "../ClientRoot/ClientRoot";
import { Check } from "@mui/icons-material";


const INITIAL_FORM_DATA = {
    firstName:'',
    lastName:'',
    email:''
}
export default function GatheringForm() {

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const [submittedRSVP, setSubmittedRSVP] = useState(false);
    const [errorSubmitRSVP, setErrorSubmitRSVP] = useState(false);
    const [loadingRSVP, setLoadingRSVP] = useState(false);

    const {gathering} = useClientData()


    const isSmallScreen = useMediaQuery('(max-width: 455px)');


    function handleChange(value, name) {
        setFormData({...formData,[name]:value});
    }

    function validateRSVPFields() {
        return Object.keys(formData).every(key => {
            return formData[key].trim() != '';
        });
    }

    async function userIsGoingToEvent() {
        if(validateRSVPFields() == false){
            console.log('invalid rsvp fields');
            return;
        }
        try {
            setLoadingRSVP(true);
            await ifawfDefault.post('/subscribers',{
                ...formData,
                dateJoined: Date.now().toString(),
                eventid: gathering[0].created
            },{
                params:{ type: 'event'}
            });

            setErrorSubmitRSVP(false);
            setFormData({...INITIAL_FORM_DATA});
            setSubmittedRSVP(true);
        } catch(error) {
            setErrorSubmitRSVP(true);
            console.log("Unable to rsvp", error);
        } finally {
            setLoadingRSVP(false);
        }
    }

    return (
        <div className="gathering-form">
            {
                (()=> {
                    if(loadingRSVP === true){
                        return (
                            <>
                                <Box height={200} margin={'0 auto'} width={400} sx={{background:'var(--dark)'}}>
                                    <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
                                        <CircularProgress sx={{fontSize:'40px', color:'#eee'}}/>
                                        <Typography fontSize={'18px'} fontFamily={'inherit'} textAlign={'center'} m={1} color={"#eee"}> Subscribing to Event</Typography>
                                    </Stack>
                                </Box>
                            </>
                        )
                    } else if(submittedRSVP === true) {
                        return (
                            <>
                                <Box height={200} margin={'0 auto'} width={400} sx={{background:'var(--dark)'}}>
                                    <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
                                        <Typography fontSize={'25px'} fontFamily={'inherit'} textAlign={'center'} m={1} color={"#eee"}> You have subscribed to this event!</Typography>
                                        <Check sx={{color:"#eee", fontSize:'50px'}}/>
                                    </Stack>
                                </Box>
                            </>
                        )
                    } else {
                        return (
                            <div className="gathering-form-container">
                                <div className="gt-title-wrapper">
                                    <p className="text gt-title">Let Us Know if You're Going</p>
                                    {/* <p className="text">This can help us better prepare for you!</p> */}
                                </div>
                                <Stack
                                    direction={'column'}
                                    justifyContent={isSmallScreen ? 'center':'space-between'}
                                    flexWrap={'wrap'}
                                    alignItems={'center'}
                                >
                                    <div className="gt-col">
                                        <GatheringFormField 
                                            onChange={(name,value)=>handleChange(value,name)} 
                                            error="Please provide first name" 
                                            label='First Name' 
                                            required name='firstName'
                                        />
                                        <GatheringFormField 
                                            onChange={(name, value)=> handleChange(value, name)}
                                            error="Please provide last name" 
                                            label='Last Name' 
                                            required 
                                            name='lastName'
                                        />
                                        <GatheringFormField
                                            onChange={(name, value)=> handleChange(value, name)}
                                            error="Please provide email"
                                            label="Email"
                                            required
                                            name='email'
                                        />  
                                    </div>
                                    {
                                        errorSubmitRSVP === true && (
                                            <Typography
                                                mt={3}
                                                color={'crimson'}
                                            >Unable to subscribe to event. Please check your internet connection.</Typography>
                                        )
                                    }
                                    

                                    <div className="gt-submit-wrapper">
                                        <button 
                                            onClick={userIsGoingToEvent} 
                                            className="submit-gtf"
                                        >I'm Going <CelebrationIcon style={{marginLeft:'10px'}}/></button>
                                    </div>
                                </Stack>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}