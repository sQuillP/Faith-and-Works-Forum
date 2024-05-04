import "./styles/Links.css"
import Footer from "../_global/Footer";
import Navbar from "../_global/Navbar";
import LinkItem from "./LinkItem";
import PageTitle from "../_global/PageTitle";
import { useEffect, useState } from "react";
import { useClientData } from "../ClientRoot/ClientRoot";



export default function Links() {
    
    const {links} = useClientData();

    console.log(links);

    return (
        <>
            <Navbar/>
            <div className="links-main">
                <PageTitle title='Helpful Links'/>
                <hr style={{width:'50vw',margin:'20px auto'}} className="fancy-hr"/>
                <div className="link-section">
                    {/* Not a linked list...LINKS LIST! */}
                    {
                        links.length > 0 ? (
                            <ul className="links-list">
                                {
                                    links.map((link, i)=> {
                                        return (
                                            <li className="link-item" key={i}>
                                                <LinkItem
                                                    description={link.title}
                                                    link={link.link}
                                                />
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        ): (
                            <div className="empty-links-list">
                                <p className="text empty-links-header">
                                    Helpful links will be coming soon! Please be patient.
                                </p>
                                <p className="text empty-links-header">404</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}