import "./styles/GatheringForm.css";
import { useState } from "react"
import GatheringFormField from "./GatheringFormField";
import { Stack, useMediaQuery } from "@mui/material";
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function GatheringForm() {

    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
    });

    const isSmallScreen = useMediaQuery('(max-width: 455px)');


    function handleChange(value, label) {

    }

    async function userIsGoingToEvent() {

    }

    return (
        <div className="gathering-form">
            <div className="gathering-form-container">
                <div className="gt-title-wrapper">
                    <p className="text gt-title">Let us Know if You're going!</p>
                </div>
                <Stack
                    direction={isSmallScreen?'column':'row'}
                    justifyContent={isSmallScreen ? 'center':'space-between'}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                >
                    <div className="gt-col">
                        <GatheringFormField error="Please provide first name" label='First Name' required name='firstName'/>
                        <GatheringFormField error="Please provide last name" label='Last Name' required name='lastName'/>
                    </div>
                    <div className="gt-submit-wrapper">
                        <button 
                            onClick={userIsGoingToEvent} 
                            className="submit-gtf"
                        >I'm Going <CelebrationIcon style={{marginLeft:'10px'}}/></button>
                    </div>
                </Stack>
            </div>
        </div>
    )
}