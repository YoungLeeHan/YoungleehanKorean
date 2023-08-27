// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import Jumbotron from "../components/cards/Jumbotron";
import ErrorImage from "../assets/images/Else/404.svg";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import useWindowWidth from "../hooks/useWindowWidth";
import { mobileWidth } from "../constants/constant";

export default function PageNotFound() {
    //hooks
    const windowWidth = useWindowWidth();
    useScrollToTop();

    return (
        <>
            <Jumbotron title={"Page Not Found"} />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                    src={ErrorImage}
                    alt="404 Error"
                    style={{
                        margin: "88px 0 38px 0",
                        width: windowWidth < mobileWidth ? "250px" : "350px",
                    }}
                />
                <h1
                    style={{
                        fontSize: windowWidth < mobileWidth ? "20px" : "32px",
                        fontWeight: "600",
                        color: "#7B1FA2",
                        textAlign: "center",
                        marginBottom: "25px",
                    }}
                >
                    We can’t find the page you’re looking for.
                </h1>
                <Link to="/">
                    <button
                        className="btn btn-primary"
                        style={{ marginBottom: "150px" }}
                    >
                        Back Home
                    </button>
                </Link>
            </div>
        </>
    );
}
