
import "./styles/PageTitle.css"
/**
 * @description Component for creating page title for the top of each page.
 * @param {*} param0 
 */
export default function PageTitle({title}) {

    return (
        <h1 className="text _pagetitle">{title}</h1>
    )
}