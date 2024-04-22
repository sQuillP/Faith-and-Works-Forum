import "./styles/ScheduleGathering.css";

import Footer from "../../_global/Footer";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Box, FormControlLabel, InputAdornment, Stack, TextField, Checkbox, Button, CircularProgress, Tooltip, IconButton, useMediaQuery, Snackbar, Alert, Divider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


/**
 * @description fetches the latest event data and will either create a new event or
 * will update the current event
 * @returns 
 */
export default function ScheduleGathering() {

    const [eventData, setEventData] = useState({
        eventDate:dayjs(new Date()),
        eventTime:dayjs(new Date()),
        address:'',
        extraDetails:'',
        emailSubscribers:true
    });

    const [creatingEvent, setCreatingEvent] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [eventCreateError, setEventCreateError] = useState(false);

    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:650px)');


    useEffect(()=> {

    },[]);


    function handleChange(value, name) {
        setEventData({...eventData, [name]:value});
    }

    async function onCreateEvent() {
        try {
            // Submit event to API
            setCreatingEvent(true);
            setTimeout(()=> {
                setCreatingEvent(false);
                setOpenSnackbar(true);
            },1000);

        } catch(error) {

        }
    }


    /**
     * @description get the latest event that has been scheduled in the database.
     */
    async function fetchLatestScheduledEvent() {

    }



    return (
        <>
            <Snackbar
                open={openSnackbar}
                onClose={()=> setOpenSnackbar(false)}
                autoHideDuration={4000}
                anchorOrigin={{horizontal:'center', vertical:'bottom'}}

            >
                {
                    eventCreateError ? (
                        <Alert
                            severity="error"
                        >
                            Unable to Create Event. Please check internet connection or contact IT.
                        </Alert>
                    ) : (
                        <Alert
                            severity="success"
                        >
                            Event has been successfully scheduled. Navigate to events to see latest update.
                        </Alert>
                    )
                }
            </Snackbar>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <div className="scg-main"> */}
                    <div className="scg-content">
                        <Box>
                            <p className="text scg-header">Schedule Next Meeting</p>
                            {/* <hr className="fancy-hr" style={{marginBottom:'50px'}} /> */}
                            <Divider sx={{mt:2}}/>
                            <p className="text scg-desc">Note that any event updates will reflect in the "Next Gathering" page in client portal.</p>
                        </Box>
                        <Stack
                            justifyContent={'center'}
                            gap={3}
                        >
                            <DatePicker 
                                label="Event Date"
                                value={eventData.eventDate}
                                onChange={(e)=> handleChange(e,'eventDate')}      
                            />
                            <Stack
                                direction={'row'}
                                flexWrap={'wrap'}
                                gap={3}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <TimePicker 
                                    onChange={(e)=> handleChange(e,'eventTime')}
                                    label='Start Time'
                                    value={eventData.eventTime}    
                                    slotProps={{
                                        textField: {
                                            size:'small',
                                            fullWidth:isSmallScreen
                                        }
                                    }}
                                />
                                {
                                    isSmallScreen === false && ("-")
                                }
                                <TimePicker 
                                    onChange={(e)=> handleChange(e,'eventTime')}
                                    label='End Time'
                                    value={eventData.eventTime}    
                                    slotProps={{
                                        textField: {
                                            size:'small',
                                            fullWidth:isSmallScreen
                                        }
                                    }}
                                />

                            </Stack>
                            
                            <TextField  
                                label="Location / Address" 
                                value={eventData.address}
                                onChange={(e)=> handleChange(e.target.value, 'address')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <LocationOnIcon fontSize='medium'/>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                label="Important / Extra Details"
                                value={eventData.extraDetails}
                                onChange={(e)=> handleChange(e.target.value, 'extraDetails')}
                                multiline
                                placeholder="Let guests know of any extra details about the event. i.e: what they should bring/expect when they arrive."
                                rows={5}
                            />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        defaultChecked
                                        onChange={(e)=>handleChange(e.target.checked, 'emailSubscribers')} 
                                        value={eventData.emailSubscribers}
                                    />
                                } 
                                label="Notify Subscribers About this Event" 
                            />
                            <Button
                                onClick={onCreateEvent}
                                disabled={creatingEvent}
                                variant='contained'
                                sx={{textTransform:'unset', fontSize:'18px'}}
                                endIcon={creatingEvent && <CircularProgress size={20} sx={{color:'white'}}/>}
                            >
                                Create Event
                            </Button>
                        </Stack>
                    </div>
                {/* </div> */}
            </LocalizationProvider>
        </>
    )
}