import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";
import { BiLinkExternal } from "react-icons/bi";

export default function BlogPostCardVertical({ post }) {
    //hook
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    const handleLinkClick = (e) => {
        e.preventDefault();
        navigate(`/blog/${post?.slug}`);
    };
    return (
        <div
            className="d-flex flex-column justify-content-between align-items-start"
            style={{
                marginBottom: "30px",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                className="img"
                style={{
                    width: "100%",
                    height: "206px",
                    borderRadius: "10px",
                    backgroundColor: "#C4C4C4",
                }}
            >
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                    }}
                    src={`${process.env.REACT_APP_API}/blog/images/${post?._id}`}
                    alt={post?.title}
                />
            </div>
            <h3
                style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    lineHeight: "160%",
                    textDecoration: "underline",
                    marginTop: "16px",
                }}
            >
                {windowWidth > mobileWidth
                    ? post?.title?.length > 30
                        ? post?.title?.substring(0, 30) + "..."
                        : post?.title?.substring(0, 30)
                    : post?.title?.length > 80
                    ? post?.title?.substring(0, 80) + "..."
                    : post?.title?.substring(0, 80)}
            </h3>
            <h5
                style={{
                    fontSize: "14px",
                    color: "#706866",
                    lineHeight: "160%",
                    margin: "10px 0 17px 0",
                }}
            >
                {windowWidth > mobileWidth
                    ? post?.value?.length > 65
                        ? post?.value?.substring(0, 65) + "..."
                        : post?.value?.substring(0, 65)
                    : post?.value?.length > 80
                    ? post?.value?.substring(0, 80) + "..."
                    : post?.value?.substring(0, 80)}
            </h5>
            <button
                onClick={handleLinkClick}
                style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    lineHeight: "160%",
                    color: "#7b1fa2",
                    backgroundColor: "transparent",
                    border: "none",
                }}
            >
                Read post <BiLinkExternal fill="#7b1fa2" />
            </button>
        </div>
    );
}
