import "./styles/Resources.css";
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import PageTitle from "../_global/PageTitle";
import ContactCard from "./ContactCard";
import ResourceEmailForm from "./ResourceEmailForm";
import { Stack } from "@mui/material";


const DUMMY_CONTACTS = [
    {
        image:"https://th.bing.com/th/id/OIP.XSZAFm-5JI7nriDLwZqRQQAAAA?rs=1&pid=ImgDetMain",
        firstName:'Josh',
        lastName:'Chudy',
        contactDetails: [
            {
                type:"Phone",
                value:'6309622100'
            },
            {
                type:'Email',
                value:'will.m.pattison@gmail.com'
            }
        ]
    },
    {
        image:"https://th.bing.com/th/id/OIP.XSZAFm-5JI7nriDLwZqRQQAAAA?rs=1&pid=ImgDetMain",
        firstName:'Michael',
        lastName:'Froedge',
        contactDetails: [
            {
                type:"Phone",
                value:'6309622100'
            },
            {
                type:'Email',
                value:'will.m.pattison@gmail.com'
            }
        ],
        
    }
]

export default function Resources() {



    return (
        <>
            <Navbar/>
            <div className="resources-container">
                <div className="rc-header">
                    <PageTitle title={'Resources'}/>
                    <hr className="fancy-hr" style={{width: '50%'}}/>
                </div>
                <div className="rc-flex-container">
                    <Stack
                        direction={'column'}
                        gap={2}
                        justifyContent={'center'}
                        alignItems={'center'}
                        padding={'20px'}
                        width={'100%'}
                        sx={{boxSizing:'border-box'}}
                        
                    >
                        <p className="text rc-contact-header">Contact</p>
                        <p className="text rc-contact-description">
                            Any immediate announcement and discussion will be held on the GroupMe
                            mobile app. If you would like stay up to date with the latest 
                            conversation, either shoot us an email or reach out to any of the contacts
                            listed to be part of our group chat.
                        </p>

                        {
                            DUMMY_CONTACTS.map((contact, i) => {
                                return (
                                    <ContactCard
                                        key={i +" " + contact.image}
                                        {...contact}
                                    />
                                )
                            })
                        }
                    </Stack>
                    <div className="rc-col">
                        <ResourceEmailForm/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}