import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";

export default function AboutCreator() {
    useScrollToTop();

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
                <div className="about-box container-fluid">About Creator</div>
            </div>
        </>
    );
}
