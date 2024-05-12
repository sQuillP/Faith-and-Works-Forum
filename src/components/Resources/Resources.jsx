import "./styles/Resources.css";
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import PageTitle from "../_global/PageTitle";
import ContactCard from "./ContactCard";
import ResourceEmailForm from "./ResourceEmailForm";
import { Stack } from "@mui/material";
import { useClientData } from "../ClientRoot/ClientRoot";


const DUMMY_CONTACTS = [
    {
        image:"/Michael_Froedge.jpg",
        firstName:'Michael',
        lastName:'Froedge',
        contactDetails: [
            {
                type:"Phone",
                value:'(765)-524-1482'
            },
            {
                type:'Email',
                value:'michaelfroedge1@gmail.com'
            }
        ]
    },
    {
        image:"/Josh_Chudy.png",
        firstName:'Josh',
        lastName:'Chudy',
        contactDetails: [
            {
                type:"Phone",
                value:'(812)-340-9928'
            },
            {
                type:'Email',
                value:'jtchudy@gmail.com'
            }
        ],
        
    }
]

export default function Resources() {

    const {contacts} = useClientData();

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
                            Any immediate announcement and discussion will be held on the <strong>GroupMe </strong>
                             mobile app. If you would like stay up to date with the latest 
                            conversation, either shoot us an email or reach out to any of the contacts
                            listed to be part of our group chat.
                        </p>

                        {
                            contacts.map((contact, i) => {
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