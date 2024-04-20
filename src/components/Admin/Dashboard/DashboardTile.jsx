import { useNavigate } from "react-router-dom";
import "./styles/DashboardTile.css";



export default function DashboardTile({title, icon, link}) {

    const navigate = useNavigate();


    return (
        <div onClick={()=>navigate(link)} className="dashboard-tile-main">
            <p className="text dt-title">{title}</p>
            <i className={icon}></i>
        </div>
    )
}