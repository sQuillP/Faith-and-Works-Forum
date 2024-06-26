import "./styles/ManageGathering.css";

import NotifySubscribers from './NotifySubscribers';
import ScheduleGathering from "./ScheduleGathering";
import ManageUserTable from "./ManageuserTable";


import { Box, Card, CardContent, IconButton, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";
import Footer from "../../_global/Footer";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ifawfAdmin } from "../../_global/ifawf-api";




export default function ManageGathering() {

    const smallScreen = useMediaQuery('(max-width: 800px)');
    const navigate = useNavigate();

    const [eventSubscriberCount, setEventSubscriberCount] = useState(0);
    const [siteSubscriberCount, setSiteSubscriberCount] = useState(0);



    useEffect(()=> {
        ( async ()=> {
            try {
                const gatheringResponse = await ifawfAdmin.get('/gathering');
                let eventGoersResponse = null;
                if(gatheringResponse.data.status < 400) {
                    const eventid = gatheringResponse.data.data[0].created;
                    eventGoersResponse = await ifawfAdmin.get('/subscribers',{
                        params: {
                            limit:'1',
                            ExclusiveStartKey:'',
                            type:'event',
                            eventid:eventid
                        }
                    });
                }
                const siteSubscribers = await ifawfAdmin.get('/subscribers',{params:{
                    limit:'1',
                    ExclusiveStartKey:'',
                    type:'all'
                }});
                if(eventGoersResponse !== null) {
                    setEventSubscriberCount(eventGoersResponse.data.count);
                }
                setSiteSubscriberCount(siteSubscribers.data.count);
            } catch(error) {
                console.log("unable to load subscriber metrics");
            }
        })();
    },[]);

    const cardSX =  {
        maxWidth: smallScreen?'100%':'300px',
        width: smallScreen? '100%': '300px',
        padding: '10px',
        elevation:3
    }
    
    return (
        <>
            <div className="mg-main-container">
                <div className="mg-content-wrapper">
                    <Box pb={2} mb={3} borderBottom={'1px solid var(--dark)'} mt={3}>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            gap={3}
                        >
                            <Tooltip>
                                <IconButton onClick={()=> navigate('/admin/dashboard')}>
                                    <ArrowBack/>
                                </IconButton>
                            </Tooltip>
                            <p className="text mg-main-title">Manage Gatherings</p>
                        </Stack>
                    </Box>
                    <Stack
                        direction={'row'}
                        gap={3}
                        flexWrap={'wrap'}
                        mb={2}
                        justifyContent={smallScreen ? 'center':'flex-start'}
                    >
                        <Card sx={cardSX}>
                            <CardContent>
                                <Typography textAlign={'center'} color={'text.secondary'}>Total Attendees (Current Event)</Typography>
                                <Typography textAlign={'center'} fontSize="30px">{eventSubscriberCount}</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={cardSX}>
                            <CardContent>
                                <Typography textAlign={'center'} color={'text.secondary'}>Total Subscribers</Typography>
                                <Typography textAlign={'center'} fontSize="30px">{siteSubscriberCount}</Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                    {/* <Card sx={{padding:'10px', mb:2}}>
                        <CardContent>
                            <Typography variant="h5">Current Event Details</Typography>
                        </CardContent>
                    </Card> */}
                    <Stack
                        direction={'row'}
                        gap={2}
                        flexWrap={smallScreen ? "wrap":'nowrap'}

                    >
                        <NotifySubscribers/>
                        <ScheduleGathering/>
                    </Stack>
                    <ManageUserTable/>
                </div>
            </div>
            <Footer/>
        </>
    )
}