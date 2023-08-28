// 👻 Developed by DanBi Choi on Aug 28th, 2023.
// -----------------------------------------------------
import Slider from "react-slick";
import {
    studentReviewForTeacher,
    sliderSettingWithDots,
} from "./../../constants/constant";
import TitleCard from "../cards/TitleCard";
import StudentReviewForCreatorCard from "../cards/StudentReviewForCreatorCard";

export default function StudentReviewCarousel() {
    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <TitleCard
                sectionTitle={"Reviews"}
                mainTitle1={"Student"}
                mainTitle2={"Reviews"}
                subParagraph={
                    "Read what my actual Korean language students have to say about my classes and materials."
                }
            />
            <Slider
                {...sliderSettingWithDots}
                style={{
                    width: "90%",
                    margin: "auto",
                    borderTop: "3px solid #7b1fa2",
                    borderBottom: "3px solid #7b1fa2",
                }}
            >
                {studentReviewForTeacher.map((data) => (
                    <StudentReviewForCreatorCard key={data.name} data={data} />
                ))}
            </Slider>
        </div>
    );
}
