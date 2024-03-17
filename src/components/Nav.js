import {Link} from "react-router-dom";

function Nav()
{
    return(
        <nav class="navbar bg-success" >
            <Link style={{fontFamily:"Agbalumo"}} to="/" class="navbar-brand mx-3">Available servicemen</Link>
            <div class="nav">
            
            </div>
        </nav>
    )
}
export default Nav;
