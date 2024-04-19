import "./styles/Resources.css";
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import PageTitle from "../_global/PageTitle";
import ContactCard from "./ContactCard";
import ResourceEmailForm from "./ResourceEmailForm";

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
        ]
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
                    <div className="rc-col">
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
                    </div>
                    <div className="rc-col">
                        <ResourceEmailForm/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}