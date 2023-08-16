// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import CustomerTypesCard from "../components/cards/CustomerTypesCard";
import "../styles/pages/Home.scss";
import { customerTypesData } from "../assets/data/customerTypesData";
import yellowLinesSVG from "../assets/images/Home/yellowLines.svg";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div
            style={{ maxWidth: "1170px" }}
            className="container-fluid d-flex flex-column align-items-center"
        >
            <section
                className="landing-view"
                style={{
                    width: "100vw",
                    backgroundColor: "#f6f4ee",
                }}
            >
                <div
                    style={{ margin: "auto", maxWidth: "1170px" }}
                    className="container-fluid"
                >
                    <div className="row">
                        <div className="col-md-7">
                            <h1>Discover the joy of learning Korean!</h1>
                            <p>
                                Dive into a fun-filled language journey with me!
                                <br />
                                Improve your Korean with my inspiring materials,
                                which explore K-Drama, K-Pop, and Korean culture
                                and target the areas of the Korean language
                                where I have students struggle the most in my
                                years of teaching.
                            </p>
                            <h5>
                                Youngleehan:영리한 means smart; clever; bright;
                                intelligent in Korean.
                            </h5>
                            <Link to="/shop">
                                <button className="btn btn-primary mb-3">
                                    Explore Products
                                </button>
                            </Link>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                            <img
                                src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
                                alt="cat"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="customerTypes container-fluid d-flex flex-column align-items-center">
                <h1>
                    <span>YoungLeeHan Korean</span> For You
                </h1>
                <p>
                    YoungLeeHan Korean materials are great for learners looking
                    to study on their own, parents searching for activities to
                    keep their kids entertained while learning, and teachers
                    sourcing exercises for their students.
                </p>
                <div className="row" style={{ width: "100%" }}>
                    {customerTypesData?.map((data) => (
                        <div className="col-md-4 mb-3" key={data._id}>
                            <CustomerTypesCard data={data} />
                        </div>
                    ))}
                </div>
            </section>

            <section
                className="creatorStory container-fluid"
                style={{ width: "100%" }}
            >
                <h3>#Creator Story</h3>
                <img
                    src={yellowLinesSVG}
                    alt="highlight"
                    style={{ transform: "translateY(-10px)" }}
                />
                <h1>
                    Why <span>YoungLeeHan Korean</span> Started
                </h1>
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
                            textbooks. I would search the web for worksheets to
                            give my students the extra practice they needed to
                            master a grammar point. However, that was still not
                            enough, so I decided to create on my own.
                        </p>
                        <Link to={"/about"} className="link-button">
                            <button className="btn btn-primary">
                                About Creator
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
