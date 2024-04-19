import { useState } from "react";
import "./styles/ResourceEmailForm.css";

import EmailField from "./EmailField";

export default function ResourceEmailForm() {

    const [emailForm, setEmailForm] = useState({
        firstName:'',
        lastName:'',
        email:'',
        emailRequest: '',
    });


    function handleChange(value, name) {
        setEmailForm({...emailForm, [name]:value});
    }
    
    
    return (
        <div className="ref-container">
            <div className="ref-header">
                <p className="text ref-header-txt">Any burning questions? Feel free to reach out to us!</p>
            </div>
            <div className="ref-body">
                <EmailField value={emailForm.firstName} onChange={(value, name)=>handleChange(value, name)}/>
                <EmailField/>
            </div>
        </div>
    )
}