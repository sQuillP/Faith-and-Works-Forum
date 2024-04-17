import "./styles/Footer.css"



export default function Footer() {


    return (
        <div className="footer-container">
            <div className="footer-message-wrapper">
                <p className="text footer-message">Faith and Works Forum - {new Date().getFullYear()}</p>
                {/* <p className="text author-small">@sQuillP</p> */}
            </div>
        </div>
    )
}