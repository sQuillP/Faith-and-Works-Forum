import "./styles/GatheringFormField.css";


/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function GatheringFormField({required,name, label, value, onChange}) {


    return (
        <div className="gtff-container">
            <label className="gtff-label">
                {label} 
                {required?<span style={{color:'red'}}>*</span>:''}
            </label>
            <input autoComplete='off' type="text" onChange={(e)=>onChange(name,e.target.value)} value={value} className="gtff-input"/>
        </div>
    )
}