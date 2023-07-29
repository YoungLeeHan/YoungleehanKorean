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
  const [title, setTitle] = useState("");
  // state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
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
      productData.append("age", age);
      productData.append("quantity", quantity);

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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await axios.post("/product");
  //       if (data?.error) {
  //         toast.error(data.error);
  //       } else {
  //         toast.success(`"${data.name}" is created`);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Blog post failed. Try again.");
  //     }
  //   };
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Product</div>
            {/* <p>Create product...</p>
            <div className="col-md-9">
              <div className="p-3 mt-2 mb-2 h4 bg-light">
                인터페이스 확인차 테스트해봄
              </div>
              <div className="p-3">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Test"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button className="btn btn-primary">Test</button>
                </form> */}
            <p>
              {products?.map((product) => (
                <Link
                  key={product._id}
                  to={`/dashboard/admin/product/update/${product.slug}`}
                >
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/product/images/${product._id}`}
                          alt={product.title}
                          className="img img-fluid rounded-start"
                        />
                      </div>

                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product?.title}</h5>
                          <p className="card-text">
                            {product?.description?.substring(0, 160)}...
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              {moment(product.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="container-fluid">
                <div className="col-md-9">
                  <div className="p-3 mt-2 mb-2 h4 bg-light">
                    <p>혜연 테스트</p>
                  </div>

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
                      {images ? images.title : "Upload images"}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                        {category.title}
                      </Option>
                    ))}
                  </Select>

                  <Select
                    bordered={false}
                    size="large"
                    className="form-select mb-3"
                    placeholder="Choose age"
                    onChange={(value) => setAge(value)}
                  >
                    <Option value="0">kids</Option>
                    <Option value="1">adults</Option>
                  </Select>

                  <input
                    type="number"
                    min="1"
                    className="form-control p-2 mb-3"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary mb-5"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
