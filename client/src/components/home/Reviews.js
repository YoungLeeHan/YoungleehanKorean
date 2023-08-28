// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// 👻 Developed by DanBi Choi on Aug 28th, 2023. (slider feature added for mobile viewers)
// -----------------------------------------------------
import { Link } from "react-router-dom";
import TitleCard from "../cards/TitleCard";
import {
    studentReviewsData,
    sliderSettingWithoutDots,
} from "./../../constants/constant";
import StudentReviewCard from "../cards/StudentReviewCard";
import { mobileWidth } from "./../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";
import Slider from "react-slick";

export default function Reviews() {
    //hooks
    const windowWidth = useWindowWidth();

    return (
        <section className="reviews container-fluid d-flex flex-column align-items-center">
            <TitleCard
                sectionTitle={"Reviews"}
                mainTitle1={"Student"}
                mainTitle2={"Reviews"}
                subParagraph={
                    "Read what my actual Korean language students have to say about my classes and materials."
                }
            />
            <div className="row" style={{ width: "100%" }}>
                {windowWidth < mobileWidth ? (
                    <Slider
                        {...sliderSettingWithoutDots}
                        style={{
                            width: "90%",
                            margin: "auto",
                            boxShadow:
                                "0px 4px 50px 0px rgba(212, 207, 207, 0.20)",
                            borderRadius: "10px",
                        }}
                    >
                        {studentReviewsData.map((data) => (
                            <StudentReviewCard key={data.name} data={data} />
                        ))}
                    </Slider>
                ) : (
                    studentReviewsData?.map((data) => (
                        <div className="col-md-4" key={data._id}>
                            <StudentReviewCard data={data} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
