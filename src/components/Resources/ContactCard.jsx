import { Stack } from "@mui/material"


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

    return (
        <div className="cc-main">

            <div className="cc-col">
                <div className="cc-lc-wrapper">
                    <div className="cc-img-container">
                        {/* image url for image */}
                        <img src={`${props.image}`} alt="user-image" className="cc-img" />
                    </div>
                    <div className="cc-lc-bottom">
                        <p className="text cc-lc-txt">{props.firstName}</p>
                    </div>
                </div>
            </div>
            <div className="cc-col">
                <div className="cc-rc-wrapper">
                    {
                        props.contactDetails.map(contactDetail => {
                            return (
                                <Stack
                                    direction={'row'}
                                    gap={1}
                                >
                                    <div className="cc-rc-col">
                                        <i className={getIcon[contactDetail.type]}></i>
                                    </div>
                                    <div className="cc-rc-col">
                                        {contactDetail.value}
                                    </div>
                                </Stack>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}