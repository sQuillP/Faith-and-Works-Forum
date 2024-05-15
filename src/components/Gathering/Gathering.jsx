import "./styles/Gathering.css";
import { useContext, useEffect, useMemo, useState } from "react"
import Navbar from "../_global/Navbar";
import Footer from "../_global/Footer";
import PageTitle from "../_global/PageTitle";
import { Stack, Button, Typography, Box } from "@mui/material";
import GatheringCard from "./GatheringCard";
import GatheringForm from "./GatheringForm";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useClientData } from "../ClientRoot/ClientRoot";


export default function Gathering() {

    const {gathering} = useClientData();
    const gatheringDate = new Date(gathering[0]?.date);
    const [dt, setDT] = useState(getFormattedDate());
    const navigate = useNavigate();



    function _getDateAndTime() {
        // ex: "Tuesday, May 14 from 7 - 9pm EDT"
        // A very annoying block of date formatting
        if(gathering.length === 0) {
            return;
        }

        if(new Date() > new Date(gathering[0])) {
            
        }
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            dayPeriod: 'long'
        };
        const [month,  year, day] = gatheringDate.toLocaleString('en-us',options)
        .replace(',','')
        .split(' ');
        const timeStart = formatTime(gatheringDate)
        let timeEnd = formatTime(new Date(gathering[0].timeEnd));
        //add pm to the end.
        if(new Date(gathering[0].timeEnd).getHours() >= 12){
            timeEnd += ' pm';
        }
        return `${month} ${gatheringDate.getDate()}, ${year} on ${day} from ${timeStart} - ${timeEnd}`
    }

    //format the time hours am/pm
    function formatTime(time) {
       if(time.getHours() == 12){
        return 12
       }
        return time.getHours() % 12;
    }
    // END block of annoying date formatting.

    //Just cache the date parsing make things go faster.
    const getDateAndTime = useMemo(()=>_getDateAndTime(),[]);

    /**
     * @description get the exact days, hours, minutes, and seconds
     * from the initial gathering date. 
     */
    function getFormattedDate() {
        let totalTime = new Date(gatheringDate) - Date.now()
        const days = Math.floor(totalTime/(1000*60*60*24));
        const hours = Math.floor(totalTime/(1000*60*60))%25
        const minutes = Math.floor(totalTime/(1000*60))%60
        const seconds = Math.floor(totalTime/1000)%60
        return {days, hours, minutes, seconds};
    }

    useEffect(()=> {
        window.scrollTo(0,0);
        const interval = setInterval(()=> {
            setDT(getFormattedDate());            
        },1000);
        return ()=> clearInterval(interval);
    },[]);


    return (
        <>
            <Navbar/>
                <div className="gathering-main">
                {
                    gathering.length === 0 || new Date() > gatheringDate ? (
                        <Box m={14}>
                            <Typography variant="h3" fontFamily={'inherit'} textAlign={'center'}>Our next gathering date is to be determined.</Typography>
                            {/* <Typography variant="h5" m={3} fontFamily={'inherit'} textAlign={'center'}>Stay up to date with all we're doing by subscribing to our email list!</Typography> */}
                            <Typography variant="h5" margin={'30px auto'} maxWidth={'900px'} fontFamily={'inherit'} textAlign={'center'}>
                                Stay connected with our forum as planning is currently in the works!
                                We will be announcing our next gathering as soon as plans are underway.
                            </Typography>
                            <div className="gathering-content-bottom">
                                <div className="gathering-content-questions">
                                    <p className="text gcq-header">Got any Questions?</p>
                                    <p className="text gcq-body">Click <b>Get Connected</b> to reach out to our hosts!</p>
                                    <button onClick={()=>navigate('/resources') } className="gc-button">Get Connected <i className="fa-solid fa-plug gc-plug"></i> </button>
                                </div>
                            </div>
                        </Box>
                    ):(
                        <>

                            <div className="gathering-header-wrapper">
                                <PageTitle title="Our Next Gathering"/>
                                <hr className="fancy-hr" style={{width:'50%'}}/>
                            </div>
                            <div className="gathering-content-container">
                                <div className="gathering-clock-wrapper">
                                    <Stack 
                                        direction={'row'}
                                        alignItems={'center'}
                                        gap={3}
                                    >
                                        <h1 className="gm-countdown-text">{dt.days}d</h1>
                                        <span className="gm-countdown-text">:</span>
                                        <h1 className="gm-countdown-text">{dt.hours}h</h1>
                                        <span className="gm-countdown-text">:</span>
                                        <h1 className="gm-countdown-text">{dt.minutes}m</h1>
                                        <span className="gm-countdown-text">:</span>
                                        <h1 className="gm-countdown-text">{dt.seconds}s</h1>
                                    </Stack>
                                </div>
                                <Stack
                                    direction={'row'}
                                    gap={3}
                                    justifyContent={'center'}
                                    alignItems={'flex-start'}
                                    marginTop={"10px"}
                                    flexWrap={'wrap'}

                                >
                                    <GatheringCard 
                                        icon={'fa-regular fa-clock'} 
                                        title={"When"} 
                                        description={getDateAndTime + " (EST)"}
                                    />
                                    <GatheringCard 
                                        icon={'fa-solid fa-map-location'} 
                                        title={"Where"} 
                                        description={gathering[0].location}
                                    />
                                    <GatheringCard 
                                        icon={"fa-solid fa-champagne-glasses"} 
                                        title={"What to Bring"} 
                                        description={gathering[0].extraRequests}
                                    />
                                </Stack>
                                {/* Gathering Form */}
                                <GatheringForm/>
                                {/* <Stack direction={'row'} marginTop={'50px'} justifyContent={'center'}>
                                    <button 
                                        className="gc-button" 
                                        onClick={()=> window.open('https://www.eventbrite.com/e/indianapolis-faith-work-forum-launch-party-tickets-883540873537?aff=oddtdtcreator')}
                                        style={{display:'flex', alignItems:'center'}}
                                    >
                                        RSVP <CheckCircleOutlineIcon style={{marginLeft: '10px'}}/>
                                    </button>
                                </Stack> */}
                                <div className="gathering-content-bottom">
                                    <div className="gathering-content-questions">
                                        <p className="text gcq-header">Got any Questions?</p>
                                        <p className="text gcq-body">Click <b>Get Connected</b> to reach out and find more details about the event</p>
                                        <button onClick={()=>navigate('/resources') } className="gc-button">Get Connected <i className="fa-solid fa-plug gc-plug"></i> </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                </div>
            <Footer/>
        </>
    )
}