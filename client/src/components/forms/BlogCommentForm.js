// 👻 Developed by DanBi Choi on Aug 11th, 2023.
// -----------------------------------------------------

import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function BlogCommentForm() {
    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");

    const handleCommentSubmit = async (e) => {
        toast.error("Blog comment feature is under construction.");
        e.preventDefault();
        if (!name || !email || !content) {
            toast.error("All fields are required.");
        } else {
            console.log({ name, email, content });
            // try {
            //     const { data } = await axios.post(`/blog/comment-create`, {
            //         name,
            //         email,
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

    return (
        <form className="comment-write" onSubmit={handleCommentSubmit}>
            <h3>Tell us what you think</h3>
            <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                }}
            />
            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                }}
            />
            <textarea
                placeholder="Your message"
                value={content}
                onChange={(e) => {
                    e.preventDefault();
                    setContent(e.target.value);
                }}
            />
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}
