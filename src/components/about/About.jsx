import "./styles/About.css";
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import PageTitle from "../_global/PageTitle";
import { useEffect, useState } from "react";
import { ifawfClient } from "../_global/ifawf-api";
import { useClientData } from "../ClientRoot/ClientRoot";


export default function About() {

    const [aboutPageData, setAboutPageData] = useState("");
    const {about} = useClientData();
    // const controller = new AbortController();

    return (
        <>
            <Navbar/>
            <div className="about-container">
                <div className="about-header">
                    <PageTitle title="About Faith and Works Forum"/>
                    <hr className="fancy-hr" style={{width:'50%'}} />
                </div>
                <div className="about-section">
                    <div className="about-section-header">
                        <h1 className="text about-section-title">
                        Strengthening and encouraging Spiritual growth in the Christian community.
                        </h1>
                    </div>
                    <div className="about-section-content">
                        <p className="text about-section-text">
                            {about}
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}