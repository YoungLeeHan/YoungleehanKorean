// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// 👻 Developed by DanBi Choi on Aug 25th, 2023. (Tester Modal Updated)
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
import { desktopWidth } from "../../constants/constant";
import yellowtagSVG from "../../assets/images/Common/yellowtag.svg";
import { Modal, ConfigProvider } from "antd";
import { useState } from "react";
import { testerWelcomeText } from "../../constants/constant";

export default function Header() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const [isNavOverlay, setIsNavOverlay] = useNavOverlay();

    //states
    const [isModalOpen, setIsModalOpen] = useState(false);

    //logout
    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Bye 👋");
        navigate("/");
    };

    //modal controllers
    const handleTesterModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

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

                    {windowWidth > desktopWidth && <NavList />}

                    {windowWidth > desktopWidth && !auth?.user && (
                        <>
                            <CartIconOnHeader />
                            <UserBtns userType="anonymous" />
                        </>
                    )}

                    {windowWidth > desktopWidth && auth?.user && (
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
                                                        : "user/orders"
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

                    {windowWidth < desktopWidth && (
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

                    {windowWidth < desktopWidth && isNavOverlay && (
                        <NavOverlay handleLogout={handleLogout} />
                    )}
                </div>
                {!auth?.user && (
                    <div
                        className="notice"
                        onClick={handleTesterModal}
                        style={{
                            cursor: "pointer",
                            transform: `translateX(150px)`,
                            transition: "transform 1.5s ease-in-out",
                        }}
                    >
                        <img src={yellowtagSVG} alt="User Notice" />
                    </div>
                )}
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#ffbf35",
                            lineHeight: "2",
                            colorPrimaryBorder: "#ffbf35",
                        },
                    }}
                >
                    <Modal
                        centered
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={windowWidth > 600 ? 600 : "100vw"}
                        okText="Ok"
                    >
                        <div
                            className="d-flex flex-column justify-content-between align-items-start"
                            style={{ padding: "40px 0 30px 0" }}
                        >
                            <div
                                style={{
                                    marginBottom: "20px",
                                    fontSize:
                                        windowWidth > 500 ? "16px" : "14px",
                                    lineHeight: "160%",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: testerWelcomeText,
                                }}
                            ></div>
                        </div>
                    </Modal>
                </ConfigProvider>
            </div>
        </>
    );
}
