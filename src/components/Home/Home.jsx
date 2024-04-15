import Navbar from "../_global/Navbar"
import ActionCard from "./ActionCard";


const homeActions = [
    {
        title: "Next Gathering",
        icon: ""
    },
    {
        title: "Our Insta",
        icon: ""
    },
    {
        title: "Helpful Links",
        icon: ""
    },
    {
        title:'Resources',
        icon:""
    }
];

/**
 * @description Home/landing page for FAWF
 */
export default function Home() {


    return (
        <div className="home-container">
            <Navbar/>
            <div className="home-hero">
                <div className="home-call-to-action">
                    <p className="text">Faith and Works Forum</p>
                    <p className="text home-bible-verse">
                        And let us consider one another in order to stir up love and good works, not forsaking the assembling of ourselves together, as is the manner of some, but exhorting one another, and so much the more as you see the Day approaching.
                    </p>
                </div>
                <img src="/FaithAndForumLogo.jpg" alt="FaithAndForum" className="hero-logo" />
            </div>
            <div className="home-action-content">
                {
                    homeActions.map(action => {
                        return (
                            <ActionCard
                                title={action.title}
                                icon={action.icon}
                            />
                        )
                    })
                }
            </div>
            <div className="home-get-connected-content">
                <div className="connected-container">
                    <p className="text connected-title">

                    </p>
                    <p className="text connected-message">
                        Don't miss out, click GET STARTED to keep yourself up to date with everything going on
                    </p>
                    <button className="get-connected-btn">Get Started</button>
                </div>
            </div>
        </div>
    )
}