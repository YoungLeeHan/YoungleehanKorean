import "../../styles/components/nav/Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Badge } from "antd";
import { useCartQuantity } from "../../context/cartQuantity";

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
            <ul className="nav sticky-top">
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                        HOME
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/shop">
                        SHOP
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/blog">
                        BLOG
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/cart">
                        <Badge
                            count={cartTotal}
                            size="small"
                            color="#ffbf35"
                            showZero="true"
                            offset={[8, 3]}
                            styles={{ indicator: { colorText: "#52c41a" } }}
                        >
                            CART
                        </Badge>
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
            </ul>
        </>
    );
}
