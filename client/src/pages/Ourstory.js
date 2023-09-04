// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import "../styles/pages/Home.scss";
import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";
import ShopVerticalSummary from "../components/common/ShopVerticalSummary";
import TitleCard from "../components/cards/TitleCard";
import StoryBoxWithPicture from "../components/cards/StoryBoxWithPicture";
import WorksheetDataForStoryCard from "../components/cards/WorksheetDataForStoryCard";
import {
    storyboxStudentData,
    worksheetTextDataForOurStory,
    maxWidth,
} from "./../constants/constant";
const { image, title, description } = storyboxStudentData;

export default function Ourstory() {
    //hooks
    useScrollToTop();

    return (
        <>
            <Jumbotron
                title={"Our Story"}
                directory={"About"}
                subDirectory={"Our Story"}
            />
            <div
                style={{ maxWidth: maxWidth }}
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
                <TitleCard
                    sectionTitle={"Worksheet "}
                    mainTitle1={"What Makes"}
                    mainTitle2={"YoungLeeHan"}
                    mainTitle3={"Special"}
                />
                {worksheetTextDataForOurStory.map((data) => (
                    <WorksheetDataForStoryCard data={data} />
                ))}
                <ShopVerticalSummary />
            </div>
        </>
    );
}
