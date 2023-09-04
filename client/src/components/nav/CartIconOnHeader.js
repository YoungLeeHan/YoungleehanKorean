// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------

import cartSVG from "../../assets/images/Common/cart.svg";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useCartQuantity } from "../../context/cartQuantity";
import { colorPurple } from "../../constants/constant";

export default function CartIconOnHeader() {
    // hooks
    const windowWidth = useWindowWidth();
    const [cartQuantity, setCartQuantity] = useCartQuantity();

    let cartTotal = 0;
    for (const key in cartQuantity) {
        cartTotal += cartQuantity[key];
    }

    return (
        <div className="cartIcon-box nav-item">
            <NavLink className="nav-link" to="/cart">
                <Badge
                    count={cartTotal}
                    size="small"
                    color={colorPurple}
                    showZero="true"
                    overflowCount={10}
                    offset={[-5, 5]}
                    styles={{ fontSize: "16px" }}
                >
                    <img src={cartSVG} alt="Cart" style={{ padding: "5px" }} />
                </Badge>
            </NavLink>
        </div>
    );
}
