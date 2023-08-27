// 👻 Developed by DanBi Choi on Aug 26th, 2023.
// -----------------------------------------------------
import { Link } from "react-router-dom";

export default function StoryBoxWithPicture({
    image,
    title,
    description,
    buttonLinkTo,
    buttonText,
}) {
    return (
        <div className="story-box row" style={{ width: "100%" }}>
            <div className="col-md-4 mb-3">
                <img src={image} alt={title} />
            </div>
            <div className="col-md-8 mb-3 d-flex flex-column justify-content-between text-start">
                <h5>"{title}"</h5>
                <p>{description}</p>
                {buttonLinkTo && (
                    <Link to={buttonLinkTo} className="link-button">
                        <button className="btn btn-primary">
                            {buttonText}
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
