import "./styles/ContactCard.css";
import { Stack } from "@mui/material"
import { formatPhone } from "../_global/utils";

// https://th.bing.com/th/id/OIP.XSZAFm-5JI7nriDLwZqRQQAAAA?rs=1&pid=ImgDetMain

/**
 * contactdetail = {
    image: string,
    contactDetails: [
        {
            type:"Phone",
            value:"630-962-2100"
        },
        {
            type:"email",
            value:"will.m.pattison@gmail.com"
        }
    ]
* }
 */



export default function ContactCard(props) {

    const getIcon = {
        phone: "fa-solid fa-phone",
        email: "fa-regular fa-envelope",
    }

    // contactDetails = [{type:"phone", value:"6309622100"}]

    console.log(props.contactDetails);
    return (
        <div className="cc-main">

            <div className="cc-col">
                <div className="cc-lc-wrapper">
                    <div className="cc-img-container">
                        {/* image url for image */}
                        <img src={`${props.image}`} alt="user-image" className="cc-img" />
                    </div>
                </div>
            </div>
            <div className="cc-col">
                <div className="cc-lc-top">
                    <p className="text cc-lc-txt">{props.firstName + " " + props.lastName}</p>
                </div>
                <div className="cc-rc-wrapper">
                    {
                        props.contactDetails.map((contactDetail, i) => {
                            return (
                                    <div key={i} className="cc-rc-col">
                                        <p className="cc-rc-txt text">
                                            <i style={{marginRight:'5px'}} className={getIcon[contactDetail.type.toLowerCase()] + ' '+ "cc-rc-icon"}></i>
                                            {
                                                contactDetail.type.toLowerCase() === 'phone'? formatPhone(contactDetail.value):contactDetail.value
                                            }
                                        </p>
                                    </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}