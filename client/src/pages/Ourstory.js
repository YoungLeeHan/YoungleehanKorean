// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import "../styles/pages/Home.scss";
import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";
import useWindowWidth from "../hooks/useWindowWidth";
import ShopVerticalSummary from "../components/common/ShopVerticalSummary";
import TitleCard from "../components/cards/TitleCard";
import StoryBoxWithPicture from "../components/cards/StoryBoxWithPicture";
import { storyboxStudentData } from "./../constants/constant";

const { image, title, description } = storyboxStudentData;

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
                className="container-fluid creatorStory d-flex flex-column align-items-center"
            >
                <TitleCard
                    mainTitle1={"What Makes"}
                    mainTitle2={"Learning Korean"}
                    mainTitle3={"Difficult?"}
                />
                <StoryBoxWithPicture
                    image={image}
                    title={title}
                    description={description}
                />
                <ShopVerticalSummary />
            </div>
        </>
    );
}
