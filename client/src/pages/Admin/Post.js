import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";


const { Option } = Select;


export default function AdminBlog() {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [photo, setPhoto] = useState("");
    //hook
    const navigate = useNavigate();




    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = new FormData();
            postData.append("title", title);
            postData.append("photo", photo);
            postData.append("description", description);
            postData.append("category", category);

            console.log([...postData]);

            const { data } = await axios.post('/dashboard/admin/post', postData);
            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`${data.title} is created`);
                navigate("/dashboard/admin/posts");
            }
        } catch (err) {
            console.log(err);
            toast.error("Post create failed. Try again.");
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                subTitle="Admin Dashboard"
            />
            <div
                style={{ maxWidth: "1170px", height: "500px" }}
                className="container-fluid"
            >
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Create Blog
                        </div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                {photo && <div className="text-center">
                                    <img
                                        src={(URL.createObjectURL(photo))}
                                        alt="Blog Photo"
                                        className="img img-responsive"
                                        height="200px"
                                    />
                                </div>}


                                <div className= "pt-2">
                                    <label className="btn btn-outline-secondary p-2 col-12 mb-3">
                                        {photo? photo.name: "Upload main image"}
                                        <input type="file"
                                               name="photo"
                                               accept="image/*"
                                               onChange={(e) => setPhoto(e.target.files[0])}
                                               hidden
                                        />
                                    </label>

                                </div>

                                <input
                                    type="text"
                                    className="form-control p-2 mb-3"
                                    placeholder="Write a title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <textarea
                                    type="text"
                                    className="form-control p-2 mb-3"
                                    placeholder="Write a content"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                <Select
                                    // showSearch
                                    bordered={false}
                                    size="large"
                                    className="form-select mb-3"
                                    placeholder="Choose category"
                                    onChange={(value) => setCategory(value)}
                                >
                                    {categories?.map((category) => (
                                        <Option key={category._id} value={category._id}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>

                                <button className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
