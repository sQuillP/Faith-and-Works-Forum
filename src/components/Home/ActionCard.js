



export default function ActionCard({title, icon}) {


    return (
        <div className="action-card-container">
            <p className="text action-card-title">
                {title}
            </p>
            {
                icon && (
                    <i className={icon}></i>
                )
            }
        </div>
    )
}