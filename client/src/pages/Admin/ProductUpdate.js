import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function AdminProductUpdate() {
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [images, setimages] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [ageCategories, setAgeCategories] = useState([]);
    const [ageCategory, setAgeCategory] = useState({});
    const [id, setId] = useState("");

    // hook
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category);

            setAgeCategory(data.ageCategory);

            setId(data._id);
        } catch (err) {
            console.log(err);
        }
    };

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

    useEffect(() => {
        loadAgeCategories();
    }, []);

    const loadAgeCategories = async () => {
        try {
            const { data } = await axios.get("/ageCategories");
            setAgeCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        console.log(typeof category);
        e.preventDefault();
        try {
            const productData = new FormData();
            if (images) productData.append("images", images);
            productData.append("title", title);
            productData.append("description", description);
            productData.append("price", price);
            if (typeof category === "string") {
                productData.append("category", category);
            } else if (typeof category === "object") {
                productData.append("category", category._id);
            }
            if (typeof ageCategory === "string") {
                productData.append("ageCategory", ageCategory);
            } else if (typeof ageCategory === "object") {
                productData.append("ageCategory", ageCategory._id);
            }

            const { data } = await axios.put(`/product/${id}`, productData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.title}" is updated`);
                navigate("/dashboard/admin/products");
            }
        } catch (err) {
            console.log(err);
            toast.error("Product update failed. Try again.");
        }
    };

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm(
                "Are you sure you want to delete this product?"
            );
            if (!answer) return;
            const { data } = await axios.delete(`/product/${id}`);
            toast.success(`"${data.title}" is deleted`);
            navigate("/dashboard/admin/products");
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
                subDirectory={"Modify Product Details"}
            />

            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Modify Product Details
                        </div>

                        {images ? (
                            <div className="text-center">
                                <img
                                    src={URL.createObjectURL(images)}
                                    alt="product images"
                                    className="img img-responsive"
                                    height="200px"
                                />
                            </div>
                        ) : (
                            <div className="text-center">
                                <img
                                    src={`${
                                        process.env.REACT_APP_API
                                    }/product/images/${id}?${new Date().getTime()}`}
                                    alt="product images"
                                    className="img img-responsive"
                                    height="200px"
                                />
                            </div>
                        )}

                        <div className="pt-2">
                            <label className="btn btn-outline-secondary col-12 mb-3">
                                {images ? images.title : "Upload images"}
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setimages(e.target.files[0])
                                    }
                                    hidden
                                />
                            </label>
                        </div>

                        <input
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Write a Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Write a description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            type="number"
                            className="form-control p-2 mb-3"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Select
                            bordered={false}
                            size="large"
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                                console.log(value);
                            }}
                            value={category.name}
                        >
                            {categories?.map((category) => (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            size="large"
                            className="form-select mb-3"
                            onChange={(value) => {
                                setAgeCategory(value);
                                console.log(value);
                            }}
                            value={ageCategory.name}
                        >
                            {ageCategories?.map((ageCategory) => (
                                <Option
                                    key={ageCategory._id}
                                    value={ageCategory._id}
                                >
                                    {ageCategory.name}
                                </Option>
                            ))}
                        </Select>

                        <div className="d-flex justify-content-between">
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary mb-5"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger mb-5"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
