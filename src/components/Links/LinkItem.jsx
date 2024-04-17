import "./styles/LinkItem.css";
import { useNavigate } from "react-router-dom"



export default function LinkItem({description, link}) {

    const router = useNavigate();



    return (
        <div onClick={()=> router(link)} className="link-item-container">
            <i className="fa-solid fa-link li-icon"></i>
            <p className="text link-item-text">{description}</p>
        </div>
    )
}