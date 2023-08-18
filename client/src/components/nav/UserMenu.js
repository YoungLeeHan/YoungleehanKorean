// 👻 Developed by DanBi Choi on Aug 15th, 2023.
// -----------------------------------------------------

import { useNavigate } from "react-router-dom";

import DashboardSideBarMenu from "../cards/DashboardSideBarMenu";
import { useState } from "react";
import { userMenuData } from "../../constants/constant";

export default function UserMenu({ id }) {
    // state
    const [currentMenu, setCurrentMenu] = useState(userMenuData[id].name);

    // hook
    const navigate = useNavigate();

    const handleMenuClick = (id) => {
        navigate(`/dashboard/user${userMenuData[id].link}`);
        setCurrentMenu(userMenuData[id].name);
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
                User Dashboard
            </h3>
            <ul>
                {userMenuData.map((menu) => (
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
