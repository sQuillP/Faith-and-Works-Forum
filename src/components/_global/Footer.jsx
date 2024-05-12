import { Link } from "react-router-dom";
import "./styles/Footer.css";



export default function Footer() {


    return (
        <div className="footer-container">
            <div className="footer-message-wrapper">
                <p className="text footer-message">Faith and Work Forum - {new Date().getFullYear()}</p>
                <p className="text author-small">v.1.1.1</p>
                <div style={{textAlign:'center', margin:'5px 0'}}>
                    <Link 
                        style={{color:'#eee', textDecoration:'none', margin:'10px', textAlign:'center !important'}}
                        to={'/unsubscribe'}
                    >Unsubscribe</Link>
                </div>
            </div>
        </div>
    )
}