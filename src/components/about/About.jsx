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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsa accusamus voluptate nemo ea, quis accusantium, beatae odio, corrupti unde explicabo ipsum perferendis ut dolorum deleniti esse eum? Soluta, velit?
                            Porro dolore in at modi iste distinctio impedit pariatur esse nesciunt facilis dolor nemo omnis veritatis perferendis tempore debitis qui autem, nam expedita? Earum, nihil. Officia praesentium tempore accusamus nulla.
                            Dolores vitae possimus tempore ad odio asperiores labore quia deserunt, tenetur temporibus sapiente pariatur voluptates eos minus consequuntur, beatae sit molestias aliquam accusamus. Porro, perspiciatis minus deserunt est corrupti numquam!
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}