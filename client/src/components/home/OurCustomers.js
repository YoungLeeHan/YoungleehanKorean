// 👻 Developed by DanBi Choi on July 19th, 2023.
// 👻 Developed by DanBi Choi on Aug 28th, 2023. (slider feature added for mobile viewers)
// -----------------------------------------------------
import TitleCard from "../cards/TitleCard";
import CustomerTypesCard from "../cards/CustomerTypesCard";
import {
    customerTypesData,
    sliderSettingWithoutDots,
} from "../../constants/constant";
import { mobileWidth } from "../../constants/constant";
import useWindowWidth from "./../../hooks/useWindowWidth";
import Slider from "react-slick";

export default function OurCustomers() {
    const windowWidth = useWindowWidth();

    return (
        <section className="customerTypes container-fluid d-flex flex-column align-items-center">
            <TitleCard
                sectionTitle={"Our Customers"}
                mainTitle2={"YoungLeeHan Korean"}
                mainTitle3={"For You"}
                subParagraph={
                    "YoungLeeHan Korean materials are great for learners looking to study on their own, parents searching for activities to keep their kids entertained while learning, and teachers sourcing exercises for their students."
                }
            />

            <div className="row" style={{ width: "100%" }}>
                {windowWidth < mobileWidth ? (
                    <Slider
                        {...sliderSettingWithoutDots}
                        style={{
                            width: "94%",
                            margin: "auto",
                        }}
                    >
                        {customerTypesData.map((data) => (
                            <CustomerTypesCard key={data.name} data={data} />
                        ))}
                    </Slider>
                ) : (
                    customerTypesData?.map((data) => (
                        <div className="col-md-4 mb-3" key={data._id}>
                            <CustomerTypesCard data={data} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
