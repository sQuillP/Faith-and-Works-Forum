import { useState } from "react"
import Navbar from "../_global/Navbar";
import Footer from "../_global/Footer";




export default function Gathering() {

    const [currentTime, setCurrentTime] = useState(new Date());




    return (
        <>
            <Navbar/>
            <div className="gathering-main">
                <p>This is the gathering page.</p>
            </div>
            <Footer/>
        </>
    )
}