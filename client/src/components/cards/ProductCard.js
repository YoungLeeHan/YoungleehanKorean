// 👻 Developed by DanBi Choi on July 26th, 2023.
// -----------------------------------------------------

import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { AiFillStar } from "react-icons/ai";

export default function ProductCard({ product }) {
    return (
        <div className="card-container">
            <div className="img">
                <Link to={`product/${product?.slug}`}>
                    {/* <img src={product?.images} alt={product?.title} />{" "} */}
                    <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/images/${product._id}`}
                        alt={product.title}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                </Link>
            </div>
            <div className="text d-flex flex-column justify-content-between align-items-between">
                <Link to={`product/${product?.slug}`}>
                    <h3>{product?.title}</h3>
                    <h5>
                        {product?.description?.length > 100
                            ? product?.description.substring(0, 100) + "..."
                            : product?.description}
                    </h5>
                </Link>

                <div className="text-bottom d-flex flex-row justify-content-between">
                    <h4>${product?.price}</h4>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="product-rate-box d-flex flex-row justify-content-between align-items-center">
                            <h6>{product?.reviewRate}</h6>
                            <h6>
                                <AiFillStar style={{ fill: "#ffbf95" }} />
                            </h6>
                            <h6>({product?.reviewNumber})</h6>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                console.log("Add to Cart button clicked");
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
