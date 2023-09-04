import { useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "./../../hooks/useScrollToTop";
import useLevelCategory from "./../../hooks/useLevelCategory";
import useAgeCategory from "./../../hooks/useAgeCategory";
import { maxWidth } from "../../constants/constant";

const { Option } = Select;

export default function AdminProductCreate() {
    // hooks
    useScrollToTop();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const { levelCategories } = useLevelCategory();
    const { ageCategories } = useAgeCategory();

    // states
    const [category, setCategory] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            for (const image of images) {
                productData.append("productImages", image);
            }
            productData.append("title", title);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("ageCategory", ageCategory);

            const { data } = await axios.post("/product", productData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.title}" is created`);
                navigate("/dashboard/admin/products");
            }
        } catch (err) {
            console.log(err);
            toast.error("Product create failed. Try again.");
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"Create Product"}
            />
            <div style={{ maxWidth: maxWidth }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={3} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Create a new product
                        </div>
                        <div>
                            {images &&
                                images.map((image) => (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="product images"
                                            className="img img-responsive"
                                            height="200px"
                                            key={image.name}
                                        />
                                    </div>
                                ))}

                            <div className="pt-2">
                                <label className="btn btn-outline-secondary col-12 mb-3">
                                    {images.length > 0
                                        ? `${images.length} images selected`
                                        : "Upload images"}
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
                                                setImages([...e.target.files]);
                                            }
                                        }}
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
                                // showSearch
                                bordered={false}
                                size="large"
                                className="form-select mb-3"
                                placeholder="Choose category"
                                onChange={(value) => setCategory(value)}
                            >
                                {levelCategories?.map((category) => (
                                    <Option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                // showSearch
                                bordered={false}
                                size="large"
                                className="form-select mb-3"
                                placeholder="Choose age category"
                                onChange={(value) => setAgeCategory(value)}
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

                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary mb-5"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
