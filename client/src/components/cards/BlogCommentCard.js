// 👻 Developed by DanBi Choi on Aug 11th, 2023.
// 👻 Developed by DanBi Choi on Aug 17th, 2023. (Backend Connection Established)
// -----------------------------------------------------
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useState } from "react";
import { Modal, ConfigProvider } from "antd";
import useWindowWidth from "../../hooks/useWindowWidth";
import ModalInfo from "./../common/ModalInfo";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BlogCommentCard({ comment, postId, loadBlogComments }) {
    //hooks
    const [auth, setAuth] = useAuth();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();

    // states
    const [newDescription, setNewDescription] = useState(comment?.description);
    const [isModalOpenModify, setIsModalOpenModify] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

    const handleLikeClick = async (id) => {
        if (!auth?.user) {
            setIsModalOpenLogin(true);
        } else {
            try {
                await axios.put(`/blog/comment/${id}/like`, {
                    id,
                });
                loadBlogComments(postId);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // modal controller for comment modification
    const handleOkModify = async () => {
        try {
            await axios.put(`/blog/comment/${comment?._id}`, {
                newDescription,
            });
            loadBlogComments(postId);
            setIsModalOpenModify(false);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancelModify = () => setIsModalOpenModify(false);

    // modal controller for comment deletion
    const handleOkDelete = async () => {
        try {
            await axios.delete(`/blog/comment/${comment?._id}`);
            loadBlogComments(postId);
            setIsModalOpenDelete(false);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancelDelete = () => setIsModalOpenDelete(false);

    // modal controller for anonymous user who clicked on like button
    const handleOkLogin = async () => {
        try {
            setIsModalOpenLogin(false);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancelLogin = () => setIsModalOpenLogin(false);

    return (
        <>
            <li className="d-flex flex-column justify-content-between">
                <div
                    style={{ marginBottom: "12px" }}
                    className="d-flex flex-row justify-content-between align-items-center"
                >
                    <div className="d-flex flex-row">
                        <AiOutlineUser
                            fill="#7b1fa2"
                            style={{ margin: "3px 10px 0 0" }}
                        />
                        <h4>
                            {comment?.user?.firstName} {comment?.user?.lastName}
                            .
                        </h4>
                    </div>

                    {auth?.user?._id === comment?.user?._id && (
                        <div className="d-flex flex-row">
                            <button
                                style={{
                                    width: "20px",
                                    border: "none",
                                    backgroundColor: "transparent",
                                }}
                                onClick={() => setIsModalOpenModify(true)}
                            >
                                <HiPencilAlt fill="#ffbf35" />
                            </button>
                            <button
                                style={{
                                    width: "20px",
                                    border: "none",
                                    backgroundColor: "transparent",
                                }}
                                onClick={() => setIsModalOpenDelete(true)}
                            >
                                <MdDelete fill="#ffbf35" />
                            </button>
                        </div>
                    )}
                </div>
                <h5>
                    <MdOutlineDateRange
                        fill="#7b1fa2"
                        style={{ margin: "0 10px 3px 0" }}
                    />
                    {moment(comment?.createdAt).format(
                        "MMMM DD YYYY [at] hh:mm a"
                    )}
                </h5>
                <p>{comment?.description}</p>
                <h5>
                    <button
                        disable={comment?.isLiked ? "true" : "false"}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLikeClick(comment?._id);
                        }}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            fontWeight: comment?.isLiked ? "400" : "600",
                            padding: "5px 10px",
                            borderRadius: "20px",
                            ...(comment?.isLiked
                                ? {
                                      border: "1px solid #ffbf35",
                                  }
                                : {
                                      border: "1px solid #7b1fa2",
                                  }),
                        }}
                    >
                        <BiLike
                            fill={comment?.isLiked ? "#ffbf35" : "#7b1fa2"}
                            className={comment?.isLiked ? "" : "bold-icon"}
                            style={{ margin: "0 10px 3px 0" }}
                        />
                        {comment?.likes?.length}
                    </button>
                </h5>
            </li>

            {/* Modal for Comment Modification starts here */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#ffbf35",
                        lineHeight: "2",
                        colorPrimaryBorder: "#ffbf35",
                    },
                }}
            >
                <Modal
                    centered
                    open={isModalOpenModify}
                    onOk={handleOkModify}
                    onCancel={handleCancelModify}
                    width={windowWidth > 600 ? 600 : "100vw"}
                    okText="Change"
                >
                    <div
                        className="d-flex flex-column justify-content-between align-items-start"
                        style={{ padding: "40px 0 30px 0" }}
                    >
                        <h3
                            style={{
                                marginBottom: "20px",
                                fontSize: windowWidth > 500 ? "16px" : "14px",
                            }}
                        >
                            Modify your comment
                        </h3>
                        <textarea
                            type="text"
                            value={newDescription}
                            onChange={(e) => {
                                e.preventDefault();
                                setNewDescription(e.target.value);
                            }}
                        ></textarea>
                    </div>
                </Modal>
            </ConfigProvider>
            {/* Modal for Comment Modification ends here */}
            {/* Modal for Comment Deletion starts here */}
            <ModalInfo
                color={"#9E1800"}
                isModalOpen={isModalOpenDelete}
                handleOk={handleOkDelete}
                handleCancel={handleCancelDelete}
                okBtnText={"Delete"}
                text={"Confirm delete."}
                width={250}
            />
            {/* Modal for Comment Deletion ends here */}
            {/* Modal for Anonymous user starts here */}
            <ModalInfo
                isModalOpen={isModalOpenLogin}
                handleOk={handleOkLogin}
                handleCancel={handleCancelLogin}
                okBtnText={"Log in"}
                text={"Please log in to like a comment!"}
            />
            {/* Modal for Anonymous user ends here */}
        </>
    );
}
