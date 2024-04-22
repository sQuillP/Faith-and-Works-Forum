import "./styles/About.css";
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import PageTitle from "../_global/PageTitle";



export default function About() {


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
                            The Indianapolis Faith & Work Forum is a community downtown that aims to 
                            integrate both faith and work. We also aim to equip leaders to engage the city as 
                            agents of the redemptive mission.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}