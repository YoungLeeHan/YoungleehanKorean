import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useParams } from "react-router-dom";

export default function SingleBlogView() {
    useScrollToTop();

    // hooks
    const params = useParams();

    return (
        <>
            <Jumbotron
                title={"Blog"}
                directory={"Blog"}
                subDirectory={"Blog Post Title"}
            />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <h1 style={{ margin: "200px" }}>Blog Post {params._id}</h1>
            </div>
        </>
    );
}
