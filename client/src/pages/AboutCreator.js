// 👻 Developed by DanBi Choi on Aug 15th, 2023.
// -----------------------------------------------------
import "../styles/pages/AboutCreator.scss";
import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";
import purpleBadge from "../assets/images/About/purpleBadge.svg";
import yellowBadge from "../assets/images/About/yellowBadge.svg";
import AboutBadge from "../components/cards/AboutBadge";
import useWindowWidth from "./../hooks/useWindowWidth";
import catImg from "./../assets/images/About/cat_square.jpg";

export default function AboutCreator() {
    useScrollToTop();
    const windowWidth = useWindowWidth();

    return (
        <>
            <Jumbotron
                title={"About Creator"}
                directory={"About"}
                subDirectory={"Creator"}
            />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="about-box row d-flex flex-row justify-content-between">
                    <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                        <div className="img-box">
                            <img src={catImg} alt="Founder" />
                        </div>
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-between text-start">
                        {windowWidth > 767 ? (
                            <h1>
                                Young-Hyun Lee
                                <span> | 영현 선생님</span>
                            </h1>
                        ) : (
                            <>
                                <h1>Young-Hyun Lee</h1>
                                <h1 style={{ fontSize: "20px" }}>
                                    영현 선생님
                                </h1>
                            </>
                        )}

                        <h5>Creator & Instructor</h5>
                        <p>
                            Out of my 13 years of teaching, I have 5 years of
                            experience teaching Korean to kids and adults,
                            beginners and near-fluent learners. I have used
                            countless different textbooks in my classes but I
                            was never satisfied with the amount of exercises for
                            each grammar point, and I found there was not enough
                            context given for the exercises that were there. I
                            wanted to provide supplemental materials to my
                            students, but I didn’t have the time to make them on
                            my own. So, I decided to start this website to
                            provide those materials for other teachers to use
                            with their students. For kids’ classes, there were
                            not enough Korean language activity books which were
                            both age and level appropriate. Most of them are
                            intended for native Korean speakers and not students
                            learning Korean as a second language.
                        </p>
                        <div
                            className={`d-flex ${
                                windowWidth > 1170 ? "flex-row" : "flex-column"
                            } justify-contents-between`}
                        >
                            <AboutBadge
                                badgeType={purpleBadge}
                                text={"Total Student"}
                                numberText={"1,000"}
                            />
                            <AboutBadge
                                badgeType={yellowBadge}
                                text={"Years of Experience"}
                                numberText={"13+"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
