// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import { Link } from "react-router-dom";
import TitleCard from "../cards/TitleCard";

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
            <div className="story-box row">
                <div className="col-md-4 mb-3">
                    <img
                        src="https://catastic.b-cdn.net/wp-content/uploads/2023/04/white-british-cat-are-wear-sunglass-shirt-concept-summer-yellow-background-1.jpg"
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
            </div>
        </section>
    );
}
