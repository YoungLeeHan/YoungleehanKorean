import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useScrollToTop from "./../../hooks/useScrollToTop";
import useLevelCategory from "./../../hooks/useLevelCategory";
import useAgeCategory from "./../../hooks/useAgeCategory";
import { maxWidth } from "../../constants/constant";

const { Option } = Select;

export default function AdminProductUpdate() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    useScrollToTop();
    const { levelCategories } = useLevelCategory();
    const { ageCategories } = useAgeCategory();

    // states
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState({});
    const [ageCategory, setAgeCategory] = useState({});
    const [id, setId] = useState("");

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
            setImages(data.imagePath);
            setId(data._id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();

            if (newImages.length > 0) {
                for (const newImage of newImages) {
                    productData.append("productImages", newImage);
                }
            } else {
                for (const image of images) {
                    productData.append("productImages", image);
                }
            }
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

            <div style={{ maxWidth: maxWidth }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={3} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Modify Product Details
                        </div>
                        {/* Show original images */}
                        {images.length > 0 && newImages.length === 0 && (
                            <div className="text-center">
                                {images.map((image, i) => (
                                    <img
                                        key={i}
                                        src={image}
                                        alt="product"
                                        className="img img-responsive"
                                        height="200px"
                                    />
                                ))}
                            </div>
                        )}
                        {/* Show newly selected images */}
                        {newImages.length > 0 && (
                            <div className="text-center">
                                {newImages.map((newImage) => (
                                    <img
                                        src={URL.createObjectURL(newImage)}
                                        alt="product images"
                                        className="img img-responsive"
                                        height="200px"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="pt-2">
                            <label className="btn btn-outline-secondary col-12 mb-3">
                                {images.length > 0 &&
                                    newImages.length === 0 &&
                                    "Click to upload new images"}
                                {newImages.length > 0 &&
                                    `${newImages.length} new images selected`}

                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files.length > 5) {
                                            alert(
                                                "You can only select up to 5 images."
                                            );
                                        } else {
                                            setNewImages([...e.target.files]);
                                        }
                                    }}
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
                            }}
                            value={category.name}
                        >
                            {levelCategories?.map((category) => (
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
