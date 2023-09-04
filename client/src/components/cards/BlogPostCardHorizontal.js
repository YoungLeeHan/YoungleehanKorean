// 👻 Developed by DanBi Choi on July 27th, 2023.
// 👻 Developed by DanBi Choi on Aug 11th, 2023. (dynamic data applied)
// -----------------------------------------------------
import "../../styles/components/cards/ProductCardHorizontal.scss";
import { useNavigate } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import moment from "moment";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth, colorPurple } from "../../constants/constant";

export default function BlogPostCardHorizontal({ post, modify = false }) {
    moment.locale("en");

    // hooks
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();

    const handleLinkClick = () => {
        if (modify) navigate(`/dashboard/admin/blog/update/${post?.slug}`);
        if (!modify) navigate(`${post?.slug}`);
    };

    return (
        <div
            className="card-container"
            style={{
                height: windowWidth < mobileWidth ? "400px" : "240px",
                cursor: "pointer",
            }}
            onClick={handleLinkClick}
        >
            <div className="img">
                <img
                    src={`${process.env.REACT_APP_API}/blog/images/${post._id}`}
                    alt={post?.title}
                />
            </div>
            <div className="text blog-text d-flex flex-column justify-content-between align-items-start">
                <h2>{post?.category?.name}</h2>
                <h3
                    style={{
                        fontSize: windowWidth < mobileWidth ? "16px" : "20px",
                    }}
                >
                    {post?.title?.length > 35
                        ? post.title.substring(0, 35) + "..."
                        : post.title}{" "}
                </h3>
                <h5
                    style={{
                        fontSize: windowWidth < mobileWidth ? "14px" : "16px",
                    }}
                >
                    {post?.value?.length > 80
                        ? post.value.substring(0, 80) + "..."
                        : post.value}
                </h5>
                <div
                    className="text-bottom d-flex flex-row justify-content-between align-items-center"
                    style={{ width: "100%" }}
                >
                    <h4
                        style={{
                            fontSize:
                                windowWidth < mobileWidth ? "12px" : "15px",
                        }}
                    >
                        Posted by YoungHyun
                    </h4>
                    <p
                        style={{
                            fontSize:
                                windowWidth < mobileWidth ? "11px" : "14px",
                        }}
                    >
                        <MdOutlineDateRange fill={colorPurple} />{" "}
                        {moment(post?.createdAt).format("MMMM DD YYYY")}
                    </p>
                </div>
            </div>
        </div>
    );
}
