import { useNavigate } from "react-router-dom";
import "./styles/ActionCard.css";



export default function ActionCard({title, icon, route, description}) {

    const navigate = useNavigate();




    return (
        <div
            onClick={()=> navigate(route)} 
            className="action-card-container"
        >
            <div className="card-title-wrapper">
                <p className="text action-card-title">
                    {title}
                </p>
            </div>
            <div className="action-card-body">
                <div className="action-card-description">
                    <p className="text card-desc">
                        {description}
                    </p>
                </div>
                {
                    icon && (
                        <i className={icon + " action-card-icon"}></i>
                    )
                }
            </div>
        </div>
    )
}