// 👻 Developed by DanBi Choi on Aug 15th, 2023.
// -----------------------------------------------------

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import DashboardSideBarMenu from "../cards/DashboardSideBarMenu";
import { useState } from "react";
import { userMenuData, adminMenuData } from "../../constants/constant";

export default function DashboardMenu({ id, menutype = "user" }) {
    // hook
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // state
    const [menuData, setMenuData] = useState(() => {
        if (menutype === "admin") {
            return adminMenuData;
        } else {
            return userMenuData;
        }
    });
    const [currentMenu, setCurrentMenu] = useState(menuData[id].name);

    const handleMenuClick = (id) => {
        navigate(`/dashboard/${menuData[id].link}`);
        setCurrentMenu(menuData[id].name);
    };

    return (
        <div
            className="user-menu-box"
            style={{
                backgroundColor: "#FFF",
                borderRadius: "10px",
                boxShadow: "0px 5px 30px 0px rgba(219, 219, 219, 0.30)",
                padding: "35px 20px",
            }}
        >
            <h3
                style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "23px",
                }}
            >
                {menutype === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </h3>
            <ul>
                {menuData.map((menu) => (
                    <li key={menu._id}>
                        <DashboardSideBarMenu
                            menu={menu}
                            isActive={currentMenu === menu.name ? true : false}
                            handleMenuClick={handleMenuClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
