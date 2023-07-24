// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------
import Jumbotron from "../components/cards/Jumbotron";
import ErrorImage from "../assets/images/Else/404.svg";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/nav/ScrollToTop";

export default function PageNotFound() {
    ScrollToTop();

    return (
        <>
            <Jumbotron title={"Page Not Found"} />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                    src={ErrorImage}
                    alt="404 Error"
                    style={{ margin: "88px 0 38px 0" }}
                />
                <h1
                    style={{
                        fontSize: "32px",
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
