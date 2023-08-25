// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import "../styles/pages/Home.scss";
import LandingView from "../components/home/LandingView";
import OurCustomers from "../components/home/OurCustomers";
import CreatorStory from "../components/home/CreatorStory";
import Worksheet from "../components/home/Worksheet";
import Reviews from "../components/home/Reviews";
import BlogVerticalSummary from "../components/common/BlogVerticalSummary";
import ShopVerticalSummary from "../components/common/ShopVerticalSummary";
import useWindowWidth from "../hooks/useWindowWidth";
import { mobileWidth } from "../constants/constant";

export default function Home() {
    //hook
    const windowWidth = useWindowWidth();

    return (
        <div
            style={{ maxWidth: "1170px" }}
            className="container-fluid d-flex flex-column align-items-center"
        >
            <LandingView />
            <OurCustomers />
            <CreatorStory />
            <Worksheet />
            <Reviews />
            {windowWidth > mobileWidth && (
                <div
                    style={{
                        width: "100vw",
                        backgroundColor: "#f6f4ee",
                        height: "300px",
                        position: "absolute",
                        top: "3130px",
                        zIndex: "-1",
                    }}
                ></div>
            )}

            <ShopVerticalSummary />
            <BlogVerticalSummary />
        </div>
    );
}
