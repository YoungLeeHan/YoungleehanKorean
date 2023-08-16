// 👻 Developed by DanBi Choi on Aug 15th, 2023.
// -----------------------------------------------------

import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { BsClipboard } from "react-icons/bs";
import DashboardSideBarMenu from "../cards/DashboardSideBarMenu";
import { useState } from "react";

const menuData = [
    { _id: 0, name: "Dashboard", link: "/", icon: BsClipboard },
    { _id: 1, name: "Profile", link: "/profile", icon: AiOutlineUser },
    { _id: 2, name: "My Order", link: "/orders", icon: AiOutlineShopping },
];

export default function UserMenu({ id }) {
    // state
    const [currentMenu, setCurrentMenu] = useState(menuData[id].name);

    // hook
    const navigate = useNavigate();

    const handleMenuClick = (id) => {
        navigate(`/dashboard/user${menuData[id].link}`);
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
                User Dashboard
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
