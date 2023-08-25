import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { editorModules, editorFormats } from "../../constants/constant";
import useScrollToTop from "./../../hooks/useScrollToTop";

const { Option } = Select;

export default function BlogUpdate() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    useScrollToTop();

    // states
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState("");
    const [id, setId] = useState("");

    // fetch blog category list from DB
    useEffect(() => {
        loadBlogCategories();
    }, []);

    // fetch blog  list from DB
    useEffect(() => {
        loadBlog();
    }, []);

    const loadBlogCategories = async () => {
        try {
            const { data } = await axios.get("/blog/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadBlog = async () => {
        try {
            const { data } = await axios.get(`/blog/${params.slug}`);
            setTitle(data.title);
            setValue(data.value);
            setCategory(data.category._id);
            setId(data._id);
        } catch (err) {
            console.log(err);
        }
    };

    // Update Post when user clicks Submit Button
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            toast.error("You forgot to write a title!");
        } else if (!value) {
            toast.error("Write something!");
        } else if (title && value) {
            try {
                const blogPostData = new FormData();
                images && blogPostData.append("images", images);
                blogPostData.append("title", title);
                blogPostData.append("category", category);
                blogPostData.append("value", value);

                const { data } = await axios.put(`/blog/${id}`, blogPostData);
                if (data?.error) {
                    toast.error(data.error);
                } else {
                    toast.success(`"${data.title}" is update`);
                    navigate("/dashboard/admin/blog/list");
                    window.location.reload();
                }
            } catch (err) {
                toast.error("Something went wrong. Try again.");
                console.log(err);
            }
        }
    };

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm(
                "Are you sure you want to delete this post?"
            );
            if (!answer) return;
            const { data } = await axios.delete(`/blog/${id}`);
            toast.success(`"${data.title}" is deleted`);
            navigate("/dashboard/admin/blog");
        } catch (err) {
            console.log(err);
            toast.error("Delete failed. Try again.");
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
                            Update a blog post
                        </div>

                        {images ? (
                            <div className="text-center">
                                <img
                                    src={URL.createObjectURL(images)}
                                    alt="blog images"
                                    className="img img-responsive"
                                    height="200px"
                                />
                            </div>
                        ) : (
                            <div className="text-center">
                                <img
                                    src={`${
                                        process.env.REACT_APP_API
                                    }/blog/images/${id}?${new Date().getTime()}`}
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
                                value={category}
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
                            ></ReactQuill>

                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-primary mt-3 mb-5"
                                    onClick={handleSubmit}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger mt-3 mb-5"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
