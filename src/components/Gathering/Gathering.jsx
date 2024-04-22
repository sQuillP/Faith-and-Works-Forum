import "./styles/Gathering.css";
import { useEffect, useState } from "react"
import Navbar from "../_global/Navbar";
import Footer from "../_global/Footer";
import PageTitle from "../_global/PageTitle";
import { Stack, Button } from "@mui/material";
import GatheringCard from "./GatheringCard";
import GatheringForm from "./GatheringForm";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DUMMY_DATE = new Date('Tue May 14 2024 19:00:00 GMT-0400 (Eastern Daylight Time)');
DUMMY_DATE.setHours(12)

export default function Gathering() {

    const [dateDiff, setDateDiff] = useState(DUMMY_DATE - Date.now());
    const navigate = useNavigate();


    function getFormattedDate() {
        let totalTime = dateDiff
        const days = Math.floor(totalTime/(1000*60*60*24));
        const hours = Math.floor(totalTime/(1000*60*60))%25
        const minutes = Math.floor(totalTime/(1000*60))%60
        const seconds = Math.floor(totalTime/1000)%60
        return {days, hours, minutes, seconds};
    }

    const dt = getFormattedDate();

    useEffect(()=> {
        window.scrollTo(0,0)
        const interval = setInterval(()=> {
            setDateDiff(DUMMY_DATE - Date.now());
        },1000);
        return ()=> clearInterval(interval);
    },[]);


    return (
        <>
            <Navbar/>
                <div className="gathering-main">
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
                                description={"Tuesday, May 14 from 7 - 9pm EDT"}
                            />
                            <GatheringCard 
                                icon={'fa-solid fa-map-location'} 
                                title={"Where"} 
                                description={"200 S Meridian Street Indianapolis ste 200, IN 46225"}
                            />
                            <GatheringCard 
                                icon={"fa-solid fa-champagne-glasses"} 
                                title={"What to Bring"} 
                                description={"Food and Drinks will be provided."}
                            />
                        </Stack>
                        {/* Gathering Form */}
                        {/* <GatheringForm/> */}
                        <Stack direction={'row'} marginTop={'50px'} justifyContent={'center'}>
                            <button 
                                className="gc-button" 
                                onClick={()=> window.open('https://www.eventbrite.com/e/indianapolis-faith-work-forum-launch-party-tickets-883540873537?aff=oddtdtcreator')}
                                style={{display:'flex', alignItems:'center'}}
                            >
                                RSVP <CheckCircleOutlineIcon style={{marginLeft: '10px'}}/>
                            </button>
                        </Stack>
                        <div className="gathering-content-bottom">
                            <div className="gathering-content-questions">
                                <p className="text gcq-header">Got any Questions?</p>
                                <p className="text gcq-body">Click <b>Get Connected</b> to reach out and find more details about the event</p>
                                <button onClick={()=>navigate('/resources') } className="gc-button">Get Connected <i className="fa-solid fa-plug gc-plug"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}