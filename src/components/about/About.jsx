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
                            Welcome to Indianapolis Faith & Work Forum! We host in-person events to allow others
                            the chance to connect with other like-minded individuals who are passionate about integrating
                            their faith into the workplace. Whether you're a seasoned professional or just starting your career,
                            this group is the perfect opportunity to engage in meaningful conversations and build valuable
                            relationships. Don't miss out on our upcoming events!
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}