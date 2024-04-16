import { useNavigate } from "react-router-dom"



export default function LinkItem({description, link}) {

    const router = useNavigate();



    return (
        <div onClick={()=> router(link)} className="link-item-container">
            <i class="fa-solid fa-link"></i>
            <p className="text link-text">{description}</p>
        </div>
    )
}