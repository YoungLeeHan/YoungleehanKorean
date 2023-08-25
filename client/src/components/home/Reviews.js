// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import { Link } from "react-router-dom";
import TitleCard from "../cards/TitleCard";
import { studentReviewsData } from "./../../constants/constant";
import StudentReviewCard from "../cards/StudentReviewCard";

export default function Reviews() {
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
            <div className="row">
                {studentReviewsData?.map((data) => (
                    <div className="col-md-4" key={data._id}>
                        <StudentReviewCard data={data} />
                    </div>
                ))}
            </div>
        </section>
    );
}
