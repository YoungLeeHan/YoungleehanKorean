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
import { mobileWidth, bgColorBeige, maxWidth } from "../constants/constant";

export default function Home() {
    //hook
    const windowWidth = useWindowWidth();

    return (
        <div
            style={{ maxWidth: maxWidth }}
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
                        backgroundColor: bgColorBeige,
                        height: "300px",
                        position: "absolute",
                        top: "3150px",
                        zIndex: "-1",
                    }}
                ></div>
            )}

            <ShopVerticalSummary />
            <BlogVerticalSummary />
        </div>
    );
}
