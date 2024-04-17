import "./styles/Home.css";
import Navbar from "../_global/Navbar"
import ActionCard from "./ActionCard";
import Footer from "../_global/Footer";

const homeActions = [
    {
        title: "Next Gathering",
        icon: "fa-solid fa-location-dot",
        description: "Find the time and place for our next meeting",
        route:'/gathering'
    },
    {
        title: "Instagram",
        icon: "fa-brands fa-instagram",
        description: "See our most recent events and posts"
    },
    {
        title: "Helpful Links",
        icon: "fa-solid fa-list",
        description:"Links that could be useful",
        route:'/links'
    },
    {
        title:'Resources',
        icon:"fa-regular fa-address-book",
        description: "Reach out and get into touch with our hosts",
        route:'/'
    },
    {
        title: "About",
        icon: "fa-solid fa-info",
        description: "Who we are and our mission statement",
        route:'/about'
    }
];
/**
 * @description Home/landing page for FAWF
 */
export default function Home() {


    return (
        <>
            <Navbar/>
            <div className="home-container">
                <div className="home-hero">
                    <img src="/Indy-Circle.jpg" alt="" className="hero-bg" />
                    <div className="home-call-to-action">
                        <h1 className="text hero-text hero-header">Faith and Works Forum</h1>
                        <p className="text hero-text home-bible-verse">
                            <i>
                            "And let us consider one another in order to stir up love and good works, not forsaking the assembling of ourselves together, as is the manner of some, but exhorting one another, and so much the more as you see the Day approaching." -
                            </i>
                            &nbsp;  Hebrews 10:25
                        </p>
                    </div>
                    <img src="/FaithAndForumLogo.jpeg" alt="FaithAndForum" className="hero-logo" />
                </div>
                <div className="home-action-content">
                    <div className="home-action-title-wrapper">
                        <h1 className="home-action-title">Stay up to Date With Everything We’re Doing</h1>
                    </div>
                    <div className="home-action-container">
                        {
                            homeActions.map(action => {
                                return (
                                    <ActionCard
                                        key={action.title}
                                        title={action.title}
                                        icon={action.icon}
                                        route={action.route}
                                        description={action.description}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}