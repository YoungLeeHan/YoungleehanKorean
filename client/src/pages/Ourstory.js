// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import "../styles/pages/Creator.scss";
import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";
import useWindowWidth from "../hooks/useWindowWidth";
import ShopVerticalSummary from "../components/common/ShopVerticalSummary";

export default function Ourstory() {
    //hooks
    useScrollToTop();
    const windowWidth = useWindowWidth();

    return (
        <>
            <Jumbotron
                title={"Our Story"}
                directory={"About"}
                subDirectory={"Our Story"}
            />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <ShopVerticalSummary />
            </div>
        </>
    );
}
