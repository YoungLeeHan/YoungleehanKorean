import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function AdminProduct() {
  const [auth, setAuth] = useAuth();
  // state
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [ageCategory, setAgeCategory] = useState("");
  const [ageCategories, setAgeCategories] = useState([]);
  const [images, setImages] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

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
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("images", images);
      productData.append("title", title);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("ageCategory", ageCategory);
      productData.append("downloadUrl", downloadUrl);

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
      <div style={{ maxWidth: "1170px" }} className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">
              Create a new product
            </div>
            <div>
              {images && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(images)}
                    alt="product images"
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
                    onChange={(e) => setImages(e.target.files[0])}
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
                {categories?.map((category) => (
                  <Option key={category._id} value={category._id}>
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
                  <Option key={ageCategory._id} value={ageCategory._id}>
                    {ageCategory.name}
                  </Option>
                ))}
              </Select>

              <input
                type="text"
                className="form-control p-2 mb-3"
                placeholder="Enter download URL"
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
              />
              <button onClick={handleSubmit} className="btn btn-primary mb-5">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
