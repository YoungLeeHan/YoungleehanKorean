// 👻 Developed by DanBi Choi on Aug 11th, 2023.
// 👻 Developed by DanBi Choi on Aug 16th, 2023. (Comment Feature Backend Connection)
// -----------------------------------------------------

import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ModalInfo from "../common/ModalInfo";
import { useNavigate } from "react-router-dom";

export default function BlogCommentForm({ postId, loadBlogComments }) {
    //states
    const [description, setDescription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleCommentSubmit = async () => {
        if (!description) {
            toast.error("All fields are required.");
        } else {
            try {
                await axios.post(`/blog/comment`, {
                    description,
                    postId,
                });
                setDescription("");
                toast.success("Thank you for your comment!");
                loadBlogComments(postId);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Modal Handlers (for unauthorized users only)
    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/login");
    };
    const handleCancel = () => setIsModalOpen(false);

    return (
        <>
            <form
                className="comment-write"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit();
                }}
            >
                {auth?.user ? (
                    <h3>Tell us what you think, {auth?.user.firstName}</h3>
                ) : (
                    <h3>Tell us what you think</h3>
                )}
                <textarea
                    placeholder="Your message"
                    value={description}
                    onChange={(e) => {
                        e.preventDefault();
                        if (auth?.user) {
                            setDescription(e.target.value);
                        } else {
                            setIsModalOpen(true);
                        }
                    }}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ borderRadius: "10px" }}
                >
                    Submit
                </button>
            </form>
            <ModalInfo
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                okBtnText={"Log in"}
                text={"Please log in to leave a comment!"}
            />
        </>
    );
}
