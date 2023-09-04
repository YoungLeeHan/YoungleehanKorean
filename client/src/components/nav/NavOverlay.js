// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------

import NavList from "./NavList";
import UserBtns from "./UserBtns";
import { IoClose } from "react-icons/io5";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useNavOverlay } from "../../context/navOverlay";
import { useAuth } from "../../context/auth";
import { colorGray } from "../../constants/constant";

export default function NavOverlay({ handleLogout }) {
    //hooks
    const [auth, setAuth] = useAuth();
    const [isNavOverlay, setIsNavOverlay] = useNavOverlay();

    return (
        <div className="NavOverlay-box d-flex flex-column justify-content-between align-items-center">
            <IoClose
                size="40px"
                fill={colorGray}
                style={{
                    padding: "5px",
                    margin: "5px",
                    position: "fixed",
                    top: "10",
                    right: "10",
                    cursor: "pointer",
                }}
                onClick={(e) => {
                    e.preventDefault();
                    setIsNavOverlay(false);
                }}
            />
            <NavList />
            {auth?.user && (
                <UserBtns userType="loggedIn" handleLogout={handleLogout} />
            )}
            {!auth?.user && <UserBtns userType="anonymous" />}
        </div>
    );
}
