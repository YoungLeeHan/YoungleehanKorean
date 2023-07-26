import "../../styles/components/nav/Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function MenuBer() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setAuth({...auth, user: null, token: ""});
        localStorage.removeItem("auth");
        navigate('/login');
    };

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


                    {!auth?.user ? (
                        <>
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
                        </>
                    ) : (
                        <li className="nav-item">
                            <a onClick={logout} className="nav-link">
                                LOGOUT
                            </a>
                        </li>
                    )}
                </ul>
            </>

            //
            // <div className={`menu-ber`}>
            //         <div className="register">
            //                 <div className="overlap-group">
            //                         <div className="register">Register</div>
            //                 </div>
            //         </div>
            //         <div className="cart-lon-in">
            //                 <div className="overlap">
            //                         <img className="vector" alt="Vector" src="vector.svg" />
            //                         <div className="ellipse" />
            //                         <div className="element">0</div>
            //                 </div>
            //                 <img className="line" alt="Line" src="line-4.svg" />
            //                 <img className="search" alt="Search" src="search.png" />
            //                 <div className="log-in">Log In</div>
            //         </div>
            //         <p className="home-about-course">
            //                 <span className="text-wrapper">Home</span>
            //                 <span className="span">
            // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact&nbsp;&nbsp;{" "}
            // </span>
            //         </p>
            //         <div className="JOY">
            //                 <div className="logo">
            //                         <img className="img" alt="Logo" src="logo.png" />
            //                 </div>
            //                 <div className="youngleehan-korean">YoungLeeHan Korean</div>
            //         </div>
            // </div>
        );
};
