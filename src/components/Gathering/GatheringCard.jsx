import { Box } from "@mui/material";
import "./styles/GatheringCard.css";


export default function GatheringCard({title, description, icon}) {



    return (
        <div className="gc-main">
            <div className="gc-icon-header">
                <i className={icon}></i>
            </div>
            <div className="gc-title-container">
                <p className="text gc-title">{title}</p>
            </div>
            <div className="gc-main-body">
                <p className="text gc-body-item">{description}</p>
            </div>
        </div>
    )
}