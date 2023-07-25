import "../../styles/components/nav/Header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <>
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                        HOME
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">
                        CONTACT
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                        LOGIN
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                        REGISTER
                    </NavLink>
                </li>
            </ul>
        </>
    );
}
