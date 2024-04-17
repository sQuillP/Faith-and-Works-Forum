import "./styles/Links.css"
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import LinkItem from "./LinkItem";
import PageTitle from "../_global/PageTitle";
import { useEffect, useState } from "react";




export default function Links() {
    const [links, setLinks] = useState([]);

    useEffect(()=> {
        const updatedLinks = []
        for(let i = 0; i< 10; i++) {
            updatedLinks.push({
                description: "How to train your dragon",
                link: "www.google.com"
            },)
        }
        setLinks(updatedLinks);
    },[]);

    console.log(links);


    return (
        <>
            <Navbar/>
            <div className="links-main">
                <PageTitle title='Helpful Links'/>
                <div className="link-section">
                    {/* Not a linked list...LINKS LIST! */}
                    <ul className="links-list">
                        {
                            links.map((link, i)=> {
                                return (
                                    <li className="link-item" key={i}>
                                        <LinkItem
                                            description={link.description}
                                            link={link.link}
                                        />
                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    )
}