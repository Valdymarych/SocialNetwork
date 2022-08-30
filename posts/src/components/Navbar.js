import { NavLink } from "react-router-dom";

function Navbar(props){
    return (
        <nav className="Navbar">
            <div>
                <NavLink to="/blog" className={({isActive})=>isActive? "active":undefined}>Blog</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={({isActive})=>isActive? "active":undefined}>Users</NavLink>
            </div>            
            {/* <div>
                <NavLink to="/chats" className={({isActive})=>isActive? "active":undefined}>Chats</NavLink>
            </div> */}
        </nav>
    )
}

export default Navbar;