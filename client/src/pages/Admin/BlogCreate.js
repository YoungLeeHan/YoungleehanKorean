// 👻 Developed by DanBi Choi on Aug 2nd, 2023.
// -----------------------------------------------------
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { editorModules, editorFormats } from "../../constants/constant";
import useScrollToTop from "./../../hooks/useScrollToTop";

const { Option } = Select;

export default function BlogCreate() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useScrollToTop();

    // states
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState("");

    // fetch blog category list from DB
    useEffect(() => {
        loadBlogCategories();
    }, []);

    const loadBlogCategories = async () => {
        try {
            const { data } = await axios.get("/blog/category/list");
            if (data.error) {
                toast.error(data.error);
            } else {
                setCategories(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // create Post when user clicks Submit Button
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!title) {
            toast.error("You forgot to write a title!");
        } else if (!value) {
            toast.error("Write something!");
        } else if (title && value) {
            try {
                const blogPostData = new FormData();
                blogPostData.append("title", title);
                blogPostData.append("category", category);
                blogPostData.append("value", value);
                blogPostData.append("images", images);

                const { data } = await axios.post(
                    `/blog/post-create`,
                    blogPostData
                );
                if (data?.error) {
                    toast.error(data.error);
                } else {
                    toast.success(`"${data.title}" is created`);
                    navigate("/dashboard/admin/blog/list");
                }
            } catch (err) {
                toast.error("Something went wrong. Try again.");
                console.log(err);
            }
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"Create Blog Post"}
            />
            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={6} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Create a blog post
                        </div>

                        {images && (
                            <div className="text-center">
                                <img
                                    src={URL.createObjectURL(images)}
                                    alt="blog images"
                                    className="img img-responsive"
                                    height="200px"
                                />
                            </div>
                        )}

                        <div className="pt-2">
                            <label className="btn btn-outline-secondary col-12 mb-3">
                                {images ? images.name : "Upload images"}
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImages(e.target.files[0])
                                    }
                                    hidden
                                />
                            </label>
                        </div>

                        <div className="text-editor-box">
                            <form onSubmit={handleCreatePost}>
                                <input
                                    type="text"
                                    className="form-control p-2 mb-3"
                                    placeholder="Write a title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Select
                                    bordered={false}
                                    size="large"
                                    className="form-select mb-3"
                                    placeholder="Choose category"
                                    onChange={(value) => setCategory(value)}
                                >
                                    {categories?.map((category) => (
                                        <Option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                    modules={editorModules}
                                    formats={editorFormats}
                                    placeholder="Enter your contents here..."
                                    style={{
                                        height: "500px",
                                    }}
                                />
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    style={{
                                        margin: "60px 0 20px 0",
                                    }}
                                >
                                    Create Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
