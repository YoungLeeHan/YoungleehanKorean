// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------

import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useNavOverlay } from "../../context/navOverlay";
import { useAuth } from "../../context/auth";
import { desktopWidth } from "../../constants/constant";

export default function UserBtns({ userType, handleLogout }) {
    //hooks
    const windowWidth = useWindowWidth();
    const [isNavOverlay, setIsNavOverlay] = useNavOverlay();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    let btn1 = {};
    let btn2 = {};

    if (userType === "loggedIn") {
        btn1 = {
            name: "My Page",
            linkTo: `/dashboard/${auth.user.role === 1 ? "admin" : "user"}`,
        };
        btn2 = { name: "My Order", linkTo: "/dashboard/user/orders" };
    } else if (userType === "anonymous") {
        btn1 = { name: "Log In", linkTo: "/login" };
        btn2 = { name: "Register", linkTo: "/register" };
    }

    return (
        <>
            <div
                className="header-btn-box nav-item d-flex flex-column align-items-center"
                style={
                    windowWidth < desktopWidth ? { marginBottom: "25vh" } : null
                }
            >
                <div className="d-flex flex-row">
                    <button
                        className="white-btn"
                        style={
                            windowWidth < desktopWidth
                                ? {
                                      border: "1px solid #7b1fa2",
                                      width: "115px",
                                      color: "#7b1fa2",
                                  }
                                : null
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            setIsNavOverlay(false);
                            navigate(btn1.linkTo);
                        }}
                    >
                        {btn1.name}
                    </button>
                    <button
                        className="purple-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsNavOverlay(false);
                            navigate(btn2.linkTo);
                        }}
                    >
                        {btn2.name}
                    </button>
                </div>
                {userType === "loggedIn" && (
                    <button
                        style={{
                            border: "none",
                            marginTop: "5vh",
                            backgroundColor: "transparent",
                            fontWeight: "500",
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsNavOverlay(false);
                            handleLogout();
                        }}
                    >
                        Log out
                    </button>
                )}
            </div>
        </>
    );
}
