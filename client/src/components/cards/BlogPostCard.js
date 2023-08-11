// 👻 Developed by DanBi Choi on July 27th, 2023.
// 👻 Developed by DanBi Choi on Aug 11th, 2023. (dynamic data applied)
// -----------------------------------------------------

import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { MdOutlineDateRange } from "react-icons/md";
import moment from "moment";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function BlogPostCard({ post }) {
    moment.locale("en");

    // hooks
    const windowWidth = useWindowWidth();

    // change html tagged string to non-tagged string
    const strippedText = post?.value.replace(/<[^>]+>/g, "");

    return (
        <Link to={`${post?.slug}`}>
            <div className="card-container">
                <div className="img">
                    <img
                        src={`${process.env.REACT_APP_API}/blog/images/${post._id}`}
                        alt={post?.title}
                    />
                </div>
                <div className="text blog-text d-flex flex-column justify-content-between align-items-between">
                    <h3>
                        {windowWidth > 450 &&
                            (post?.title?.length > 35
                                ? post?.title?.substring(0, 35) + "..."
                                : post?.title)}
                        {windowWidth < 450 &&
                            (post?.title?.length > 25
                                ? post?.title?.substring(0, 25) + "..."
                                : post?.title)}
                    </h3>
                    <h5>
                        {windowWidth > 1200 &&
                            (strippedText?.length > 140
                                ? strippedText.substring(0, 140) + "..."
                                : strippedText)}
                        {windowWidth < 1200 &&
                            (strippedText?.length > 70
                                ? strippedText.substring(0, 70) + "..."
                                : strippedText)}
                    </h5>

                    <div className="text-bottom d-flex flex-row justify-content-between align-items-center">
                        <h4>Posted by YoungHyun</h4>
                        <p>
                            <MdOutlineDateRange fill="#7b1fa2" />{" "}
                            {moment(post?.createdAt).format("MMMM DD YYYY")}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
