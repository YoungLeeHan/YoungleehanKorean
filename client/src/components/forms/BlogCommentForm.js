// 👻 Developed by DanBi Choi on Aug 11th, 2023.
// -----------------------------------------------------

import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ModalInfo from "../common/ModalInfo";
import { useNavigate } from "react-router-dom";

export default function BlogCommentForm() {
    //states
    const [content, setContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleCommentSubmit = async (e) => {
        toast.error("Blog comment feature is under construction.");
        e.preventDefault();
        if (!content) {
            toast.error("All fields are required.");
        } else {
            console.log({ content });
            // try {
            //     const { data } = await axios.post(`/blog/comment-create`, {
            //         content,
            //     });
            //     if (data?.error) {
            //         console.log(data?.error);
            //     } else {
            //         toast.success("Thank you for your comment!");
            //     }
            // } catch (err) {
            //     console.log(err);
            // }
        }
    };

    // Modal Handlers
    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/login");
    };
    const handleCancel = () => setIsModalOpen(false);

    return (
        <>
            <form className="comment-write" onSubmit={handleCommentSubmit}>
                {auth?.user ? (
                    <h3>Tell us what you think, {auth?.user.firstName}</h3>
                ) : (
                    <h3>Tell us what you think</h3>
                )}
                <textarea
                    placeholder="Your message"
                    value={content}
                    onChange={(e) => {
                        e.preventDefault();
                        if (auth?.user) {
                            setContent(e.target.value);
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
