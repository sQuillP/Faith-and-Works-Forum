import "./styles/EmailField.css";



export default function EmailField({type, placeholder, label, name, value, onChange}) {


    return (
        <div className="ef-container">
            <label className="ef-label" htmlFor="">{label} <span style={{color:'red'}}> *</span></label>
            <input 
                value={value}
                onChange={(e)=>onChange(name,e.target.value)}
                type={type}
                placeholder={placeholder}
                className="ef-input"
            />
        </div>
    )
}