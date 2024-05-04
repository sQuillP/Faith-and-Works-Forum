import "./styles/ContactCard.css";
import { Stack } from "@mui/material"
import { formatPhone } from "../_global/utils";




export default function ContactCard(props) {

    return (
        <div className="cc-main">

            <div className="cc-col">
                <div className="cc-lc-wrapper">
                    <div className="cc-img-container">
                        {/* image url for image */}
                        {
                            props.image ? (
                                <img src={`${props.image}`} alt="user-image" className="cc-img" />
                            ): (
                                <img src="/Unknown_User.jpg" alt="User Unknwon" className="cc-img" />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="cc-col">
                <div className="cc-lc-top">
                    <p className="text cc-lc-txt">{props.firstName + " " + props.lastName}</p>
                </div>
                <div className="cc-rc-wrapper">
                    <div className="cc-rc-col">
                        <p className="cc-rc-txt text">
                            <i style={{marginRight:'5px'}} className={'fa-solid fa-phone' + ' '+ "cc-rc-icon"}></i>
                            {
                                formatPhone(props.phone)
                            }
                        </p>
                    </div>
                    <div className="cc-rc-col">
                        <p className="cc-rc-txt text">
                            <i style={{marginRight:'5px'}} className={"fa-regular fa-envelope" + ' '+ "cc-rc-icon"}></i>
                            {
                                props.email
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}