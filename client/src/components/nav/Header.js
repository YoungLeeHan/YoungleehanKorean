import "../../styles/components/nav/Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Badge } from "antd";
import { useCartQuantity } from "../../context/cartQuantity";
import logoIMG from "../../assets/images/Common/logo.svg";

export default function MenuBer() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [cartQuantity, setCartQuantity] = useCartQuantity();

    let cartTotal = 0;
    for (const key in cartQuantity) {
        cartTotal += cartQuantity[key];
    }

    const logout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <>
            <div className="nav-box sticky-top">
                <div
                    className="container d-flex flex-row justify-content-between align-items-center"
                    style={{ maxWidth: "1170px" }}
                >
                    <div className="logo-box d-flex flex-row justify-content-between align-items-center">
                        <img src={logoIMG} alt="Logo" />
                        <h1>YoungLeeHan Korean</h1>
                    </div>

                    <ul className="d-flex flex-row justify-content-between align-items-center">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop">
                                Shop
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blog">
                                Blog
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                    <div className="nav-item">
                        <NavLink className="nav-link" to="/cart">
                            <Badge
                                count={cartTotal}
                                size="small"
                                color="#ffbf35"
                                showZero="true"
                                offset={[8, 3]}
                                styles={{
                                    indicator: { colorText: "#52c41a" },
                                }}
                            >
                                CART
                            </Badge>
                        </NavLink>
                    </div>

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
                        <div className="dropdown">
                            <li>
                                <a
                                    className="dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    {auth?.user?.firstName}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
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
                                                onClick={logout}
                                                className="nav-link"
                                            >
                                                LOGOUT
                                            </a>
                                        </li>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
