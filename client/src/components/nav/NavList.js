// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------

import { useNavigate } from "react-router-dom";
import useWindowWidth from "./../../hooks/useWindowWidth";
import { useNavOverlay } from "../../context/navOverlay";
import { desktopWidth } from "../../constants/constant";

const linkData = [
    { name: "Home", linkTo: "/" },
    { name: "Shop", linkTo: "/shop" },
    { name: "Creator", linkTo: "/creator" },
    { name: "Our Story", linkTo: "/ourstory" },
    { name: "Blog", linkTo: "/blog" },
    { name: "Contact", linkTo: "/contact" },
];

export default function NavList() {
    //hooks
    const windowWidth = useWindowWidth();
    const [isNavOverlay, setIsNavOverlay] = useNavOverlay();
    const navigate = useNavigate();

    return (
        <ul
            className={`d-flex ${
                windowWidth > desktopWidth ? "flex-row" : "flex-column"
            } justify-content-between align-items-center`}
            style={
                windowWidth > desktopWidth
                    ? { margin: "0 1vw" }
                    : { margin: "15vh 0" }
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
