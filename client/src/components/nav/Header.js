// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------

import "../../styles/components/nav/Header.scss";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import logoIMG from "../../assets/images/Common/logo.svg";
import NavList from "./NavList";
import NavOverlay from "./NavOverlay";
import useWindowWidth from "./../../hooks/useWindowWidth";
import CartIconOnHeader from "./CartIconOnHeader";
import UserBtns from "./UserBtns";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavOverlay } from "../../context/navOverlay";
import { toast } from "react-hot-toast";

export default function Header() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const [isNavOverlay, setIsNavOverlay] = useNavOverlay();

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Bye 👋");
        navigate("/");
    };

    return (
        <>
            <div className="nav-box sticky-top">
                <div
                    className="container d-flex flex-row justify-content-between align-items-center"
                    style={{ maxWidth: "1170px", width: "100%" }}
                >
                    <Link to="/">
                        <div className="header-logo-box d-flex flex-row justify-content-between align-items-center">
                            <img src={logoIMG} alt="Logo" />
                            <h1
                                style={
                                    windowWidth < 400
                                        ? { fontSize: "15px" }
                                        : { fontSize: "18px" }
                                }
                            >
                                YoungLeeHan Korean
                            </h1>
                        </div>
                    </Link>

                    {windowWidth > 1023 && <NavList />}

                    {windowWidth > 1023 && !auth?.user && (
                        <>
                            <CartIconOnHeader />
                            <UserBtns userType="anonymous" />
                        </>
                    )}

                    {windowWidth > 1023 && auth?.user && (
                        <>
                            <div className="dropdown">
                                <div>
                                    <a
                                        href=""
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            padding: "5px",
                                        }}
                                    >
                                        Hi {auth?.user?.firstName}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to={`/dashboard/${
                                                    auth?.user?.role === 1
                                                        ? "admin"
                                                        : "user"
                                                }`}
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                onClick={handleLogout}
                                                className="nav-link"
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <CartIconOnHeader />

                            <div className="header-btn-box">
                                <NavLink
                                    className="nav-link"
                                    to="/dashboard/user/orders"
                                >
                                    <button className="purple-btn">
                                        My Order
                                    </button>
                                </NavLink>
                            </div>
                        </>
                    )}

                    {windowWidth < 1023 && (
                        <>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <CartIconOnHeader />
                                <RxHamburgerMenu
                                    size="40px"
                                    style={{
                                        marginLeft: "15px",
                                        cursor: "pointer",
                                        padding: "5px",
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsNavOverlay((curr) => !curr);
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {windowWidth < 1023 && isNavOverlay && (
                        <NavOverlay handleLogout={handleLogout} />
                    )}
                </div>
            </div>
        </>
    );
}
