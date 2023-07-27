// 👻 Developed by DanBi Choi on July 27th, 2023.
// -----------------------------------------------------

import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { MdOutlineDateRange } from "react-icons/md";
import moment from "moment";

export default function BlogPostCard({ post }) {
    return (
        <Link to={`${post._id}`}>
            <div className="card-container">
                <div className="img">
                    <img
                        src="https://media.istockphoto.com/id/1199279669/photo/big-eyed-naughty-obese-cat-behind-the-desk-with-red-hat-grey-color-british-sort-hair-cat.jpg?s=612x612&w=0&k=20&c=hoxRypOLncBNMyRrY-wiWSQDkNcageAVpFGGRi_KHKI="
                        alt="cat"
                    />{" "}
                </div>
                <div className="text blog-text d-flex flex-column justify-content-between align-items-between">
                    <h3>{post?.title}</h3>
                    <h5>
                        {post?.content?.length > 100
                            ? post?.content?.substring(0, 100) + "..."
                            : post?.content}
                    </h5>

                    <div className="text-bottom d-flex flex-row justify-content-between align-items-center">
                        <h4>Posted by {post?.writer}</h4>
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
