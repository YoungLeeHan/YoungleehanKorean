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

            {/* <div className="story-box row">
                <div className="col-md-4 mb-3">
                    <img
                        src="
                        alt="Founder"
                    />
                </div>
                <div className="col-md-8 mb-3 d-flex flex-column justify-content-between text-start">
                    <h5>“Why aren’t there more exercises?”</h5>
                    <p>
                        While teaching Korean, I was often frustrated by the
                        amount of exercises for each grammar point in the
                        textbooks. I would search the web for worksheets to give
                        my students the extra practice they needed to master a
                        grammar point. However, that was still not enough, so I
                        decided to create on my own.
                    </p>
                    <Link to={"/creator"} className="link-button">
                        <button className="btn btn-primary">
                            About Creator
                        </button>
                    </Link>
                </div>
            </div> */}
        </section>
    );
}
