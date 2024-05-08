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
import { ifawfAdmin } from "../../_global/ifawf-api";

const DEFAULT_FORM_BODY = {
    date:dayjs(new Date()),
    timeStart: dayjs(new Date()),
    timeEnd:dayjs(new Date()),
    location:'',
    extraRequests:'',
    created: new Date().getTime()
}
/**
 * @description fetches the latest event data and will either create a new event or
 * will update the current event
 * @returns 
 */
export default function ScheduleGathering() {

    const [eventData, setEventData] = useState(DEFAULT_FORM_BODY);
    const [notifySubscribers, setNotifySubscribers] = useState(false);
    // For Creating an event
    const [creatingEvent, setCreatingEvent] = useState(false);
    const [eventError, setEventError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // For Updating an event
    const [updatingEvent, setUpdatingEvent] = useState(false);
    //for deleting an event
    const [deletingEvent, setDeletingEvent]= useState(false);
    //If there is already an event, this flag determines if we will 
    //create a new event or update the current one.
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:650px)');
    const [loadingCurrentEvent, setLoadingCurrentEvent] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventLoadError, setEventLoadError] = useState(false);


    useEffect(()=> {
        ( async ()=> {
            try {
                setLoadingCurrentEvent(true)
                const currentEvent = await ifawfAdmin.get('/gathering')
                if(currentEvent.data.status >= 400) {
                    throw new Error("Invalid request");
                }
                if(currentEvent.data.data.length == 0) return;
                const gatheringObj = currentEvent.data.data[0]
                const gathering = new Date(gatheringObj.date);
                // If the current gathering is already past, just return from everything.
                // When there is already an existing date that has been planned, then 
                //make sure that the current gathering is shown before they can create a new one.
                //This case is handled if either there is no scheduled gathering or gathering has already passed.
                setIsUpdateMode(true);
                populateFields(gatheringObj)
                //
            } catch(error) {
                setEventLoadError(true);
            } finally {
                setLoadingCurrentEvent(false);
            }
        })();
    },[]);


    //Autopopulate the gathering fields when called
    //gatheringObj = gathering object fetched from api/dynamo
    function populateFields(gatheringObj) {
        const gathering = new Date(gatheringObj.date);
        setEventData({
            date:dayjs(gathering),
            timeStart: dayjs(gathering),
            timeEnd: dayjs(new Date(gatheringObj.timeEnd)),
            location: gatheringObj.location,
            extraRequests: gatheringObj.extraRequests,
            main:'main',
            created:gatheringObj.created
        });
    }


    /**
     * @description take the form date and turn it into a request body 
     * to send get/put requests.
     */
    function mapFormGatheringToRequest() {
        //grab the start date
        const startDate = eventData.date.toDate()
        //add the time start to the start date.
        startDate.setHours(eventData.timeStart.hour());
        startDate.setMinutes(eventData.timeStart.minute());
        const requestPayload = {
            created:eventData.created.toString(),
            main:"main",
            date:startDate,
            timeEnd: eventData.timeEnd.toDate(),
            location: eventData.location,
            extraRequests: eventData.extraRequests
        };
        return requestPayload
    }
   

    function handleChange(value, name) {
        setEventData({...eventData, [name]:value});
    }

    /**
     * Please not that I am separating the logic between creating and updating an event even though
     * they are virtually handled the exact same way on the backend. This is to avoid confusion on the 
     * frontend.
     */

    async function onCreateEvent() {
        try {
            setCreatingEvent(true);
            const createdEvent = await ifawfAdmin.post('/gathering',mapFormGatheringToRequest());
            if(createdEvent.data.status >= 400) {
                throw new Error("invalid request");
            }
            const event = createdEvent.data.data[0];
            setIsUpdateMode(true);
            populateFields(event);
            setEventError(false);
        } catch(error) {
            setEventError(true);
        } finally {
            setOpenSnackbar(true);
            setCreatingEvent(false);
        }
    }


    async function onUpdateEvent() {
        try {
            setUpdatingEvent(true);
            const updatedEvent = await ifawfAdmin.put('/gathering',mapFormGatheringToRequest());
            if(updatedEvent.data.status >=400){
                throw new Error("Invalid request");
            }
            const event = updatedEvent.data.data[0];
            populateFields(event);
            setEventError(false);
        } catch(error) {
            console.log(error);
            setEventError(true);
        } finally {
            setOpenSnackbar(true);
            setUpdatingEvent(false);
        }
    }


    


    async function onDeleteEvent() {
        try {
            setDeletingEvent(true);
            const deletedEvent = await ifawfAdmin.delete('/gathering',{
                data:{created:eventData.created,main:'main'}
            });
            if(deletedEvent.data.status >=400) {
                throw new Error('invalid request')
            }
            setEventData(DEFAULT_FORM_BODY);
            setEventError(false);
            setIsUpdateMode(false);
        } catch(error) {
            setEventError(true);
        } finally {
            setOpenSnackbar(true);
            setDeletingEvent(false);
        }
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
                    (eventError === true) ? (
                        <Alert
                            severity="error"
                        >
                            Unable to Perform Action. Please check internet connection or contact IT.
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
                            <p className="text scg-header">Schedule Next Gathering</p>
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
                                value={eventData.date}
                                onChange={(e)=> handleChange(e,'date')}      
                            />
                            <Stack
                                direction={'row'}
                                flexWrap={'wrap'}
                                gap={3}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <TimePicker 
                                    onChange={(e)=> handleChange(e,'timeStart')}
                                    label='Start Time'
                                    value={eventData.timeStart}    
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
                                    onChange={(e)=> handleChange(e,'timeEnd')}
                                    label='End Time'
                                    value={eventData.timeEnd}    
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
                                value={eventData.location}
                                onChange={(e)=> handleChange(e.target.value, 'location')}
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
                                value={eventData.extraRequests}
                                onChange={(e)=> handleChange(e.target.value, 'extraRequests')}
                                multiline
                                placeholder="Let guests know of any extra details about the event. i.e: what they should bring/expect when they arrive."
                                rows={5}
                            />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        defaultChecked
                                        onChange={(e)=> setNotifySubscribers(e.target.checked)} 
                                        value={eventData.emailSubscribers}
                                    />
                                } 
                                label="Notify Subscribers About this Event" 
                                disabled={isUpdateMode}
                            />
                            {
                                isUpdateMode === false ? (
                                    <>

                                        <Button
                                            onClick={onCreateEvent}
                                            disabled={creatingEvent || loadingCurrentEvent}
                                            variant='contained'
                                            sx={{textTransform:'unset', fontSize:'18px'}}
                                            endIcon={creatingEvent && <CircularProgress size={20} sx={{color:'white'}}/>}
                                        >
                                            Create Event
                                        </Button>
                                    </>
                                ): (
                                    <Stack gap={1}>
                                        <Button
                                            onClick={onUpdateEvent}
                                            disabled={updatingEvent || loadingCurrentEvent}
                                            variant='contained'
                                            sx={{textTransform:'unset', fontSize:'18px', m:0}}
                                            endIcon={updatingEvent && <CircularProgress size={20} sx={{color:'white'}}/>}
                                        >
                                            Update Event
                                        </Button>
                                        <Button
                                            onClick={onDeleteEvent}
                                            disabled={deletingEvent || loadingCurrentEvent || updatingEvent}
                                            color='error'
                                            variant='contained'
                                            sx={{textTransform:'unset', fontSize:'18px'}}
                                            endIcon={deletingEvent && <CircularProgress size={20} sx={{color:'white'}}/>}
                                        >
                                            Delete Event
                                        </Button>
                                    </Stack>
                                )
                            }
                        </Stack>
                    </div>
                {/* </div> */}
            </LocalizationProvider>
        </>
    )
}