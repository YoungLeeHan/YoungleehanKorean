// 👻 Developed by DanBi Choi on Aug 15th, 2023.
// -----------------------------------------------------
import { colorPurple } from "../../constants/constant";

export default function DashboardSideBarMenu({
    menu,
    handleMenuClick,
    isActive,
}) {
    const IconComponent = menu.icon;

    return (
        <button
            style={{
                backgroundColor: isActive ? colorPurple : "#F8F8F8",
                color: isActive ? "#FFF" : "#1A2E35",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "7px",
                border: "none",
                width: "100%",
                textAlign: "start",
            }}
            onClick={(e) => {
                e.preventDefault();
                handleMenuClick(menu._id);
            }}
        >
            <IconComponent
                fill={isActive ? "#FFF" : "#1A2E35"}
                style={{ margin: "0 15px 0 10px" }}
            />
            {menu.name}
        </button>
    );
}
