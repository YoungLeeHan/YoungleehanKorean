// 👻 Developed by DanBi Choi on Aug 29th, 2023.
// -----------------------------------------------------
import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";
import TitleCard from "../components/cards/TitleCard";
import AccordionDisplay from "../components/common/AccordionDisplay";

export default function Faq() {
    //hooks
    useScrollToTop();

    return (
        <>
            <Jumbotron title={"FAQ"} directory={"FAQ"} />
            <div
                style={{ maxWidth: "1170px", minHeight: "500px" }}
                className="container-fluid"
            >
                <div className="row" style={{ marginBottom: "75px" }}>
                    <TitleCard
                        mainTitle1={"Frequently Asked"}
                        mainTitle2={"Questions"}
                        subParagraph={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore  minim veniam."
                        }
                    />

                    <div className="col-md-6">
                        <AccordionDisplay type={"faq1"} />
                    </div>
                    <div className="col-md-6">
                        <AccordionDisplay type={"faq2"} />
                    </div>
                </div>
            </div>
        </>
    );
}
