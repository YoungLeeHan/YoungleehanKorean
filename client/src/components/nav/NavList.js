// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------

import { useNavigate } from "react-router-dom";
import useWindowWidth from "./../../hooks/useWindowWidth";
import { useNavOverlay } from "../../context/navOverlay";

export default function NavList() {
    //hooks
    const windowWidth = useWindowWidth();
    const [isNavOverlay, setIsNavOverlay] = useNavOverlay();
    const navigate = useNavigate();

    const linkData = [
        { name: "Home", linkTo: "/" },
        { name: "About", linkTo: "/about" },
        { name: "Shop", linkTo: "/shop" },
        { name: "Blog", linkTo: "/blog" },
        { name: "Contact", linkTo: "/contact" },
    ];

    return (
        <ul
            className={`d-flex ${
                windowWidth > 1023 ? "flex-row" : "flex-column"
            } justify-content-between align-items-center`}
            style={
                windowWidth > 1023 ? { margin: "0 90px" } : { margin: "15vh 0" }
            }
        >
            {linkData.map((data, i) => (
                <li className="nav-item" key={i}>
                    <div
                        className="nav-link"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsNavOverlay(false);
                            navigate(data.linkTo);
                        }}
                    >
                        {data.name}
                    </div>
                </li>
            ))}
        </ul>
    );
}
