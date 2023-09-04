// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import { Link } from "react-router-dom";
import { bgColorBeige, maxWidth } from "../../constants/constant";

export default function LandingView() {
    return (
        <section
            className="landing-view"
            style={{
                width: "100vw",
                backgroundColor: bgColorBeige,
            }}
        >
            <div
                style={{ margin: "auto", maxWidth: maxWidth }}
                className="container-fluid"
            >
                <div className="row">
                    <div className="col-md-7">
                        <h1>Discover the joy of learning Korean!</h1>
                        <p>
                            Dive into a fun-filled language journey with me!
                            <br />
                            Improve your Korean with my inspiring materials,
                            which explore K-Drama, K-Pop, and Korean culture and
                            target the areas of the Korean language where I have
                            students struggle the most in my years of teaching.
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
    );
}
