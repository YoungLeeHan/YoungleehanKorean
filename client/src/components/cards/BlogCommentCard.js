// 👻 Developed by DanBi Choi on Aug 11th, 2023.
// -----------------------------------------------------
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogCommentCard({ comment }) {
    const [likeCount, setLikeCount] = useState(0);
    const [isFirstLike, setIsFirstLike] = useState(true);

    useEffect(() => {
        setLikeCount(comment?.likeCount);
    }, []);

    const handleLikeClick = async (id) => {
        if (isFirstLike) {
            setLikeCount((curr) => curr + 1);
            console.log(likeCount);
            // try {
            //     const { data } = await axios.put(`/blog/likeCount/${id}`, {
            //         likeCount,
            //     });
            // } catch (err) {
            //     console.log(err);
            // }
            setIsFirstLike(false);
        }
    };

    return (
        <>
            <li className="d-flex flex-column justify-content-between">
                <h4>
                    <AiOutlineUser
                        fill="#7b1fa2"
                        style={{ margin: "0 10px 3px 0" }}
                    />
                    {comment?.name}
                </h4>
                <h5>
                    <MdOutlineDateRange
                        fill="#7b1fa2"
                        style={{ margin: "0 10px 3px 0" }}
                    />
                    {moment(comment?.createdAt).format(
                        "MMMM DD YYYY [at] hh:mm a"
                    )}
                </h5>
                <p>{comment?.content}</p>
                <h5>
                    <button
                        disable={isFirstLike ? "true" : "false"}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLikeClick(comment._id);
                        }}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            fontWeight: isFirstLike ? "400" : "600",
                        }}
                    >
                        <BiLike
                            fill={isFirstLike ? "#ffbf35" : "#7b1fa2"}
                            className={isFirstLike ? "" : "bold-icon"}
                            style={{
                                margin: "0 10px 3px 0",
                            }}
                        />
                        {likeCount}
                    </button>
                </h5>
            </li>
        </>
    );
}
