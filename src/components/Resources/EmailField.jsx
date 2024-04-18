import "./styles/EmailField.css";



export default function EmailField({label, name, value, onChange}) {


    return (
        <div className="ef-container">
            <label htmlFor="">{label} <span style={{color:'red'}}> *</span></label>
            <input 
                value={value}
                onChange={(e)=>onChange(name,e.target.value)}
                type="text" 
                className="ef-input"
            />
        </div>
    )
}