// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import TitleCard from "../cards/TitleCard";
import { storyboxCreatorData } from "../../constants/constant";
import StoryBoxWithPicture from "../cards/StoryBoxWithPicture";

const { image, title, description, buttonLinkTo, buttonText } =
    storyboxCreatorData;

export default function CreatorStory() {
    return (
        <section
            className="creatorStory container-fluid"
            style={{ width: "100%" }}
        >
            <TitleCard
                sectionTitle={"Creator Story"}
                mainTitle1={"Why"}
                mainTitle2={"YoungLeeHan Korean"}
                mainTitle3={"Started"}
            />
            <StoryBoxWithPicture
                image={image}
                title={title}
                description={description}
                buttonLinkTo={buttonLinkTo}
                buttonText={buttonText}
            />
        </section>
    );
}
