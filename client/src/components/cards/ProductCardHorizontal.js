// 👻 Developed by DanBi Choi on July 26th, 2023.
// 👻 Developed by DanBi Choi on July 29th, 2023. (Add To Cart Button)
// 👻 Developed by DanBi Choi on Aug 20th, 2023. (Add To Cart Modulized)
// -----------------------------------------------------
import "../../styles/components/cards/ProductCardHorizontal.scss";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import useWindowWidth from "../../hooks/useWindowWidth";
import useAddToCart from "../../hooks/useAddToCart";
import { mobileWidth } from "../../constants/constant";

export default function ProductCardHorizontal({ product, modify = false }) {
    // hooks
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();
    const addtoCart = useAddToCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addtoCart(product);
    };

    const handleLinkClick = (e) => {
        e.preventDefault();
        navigate(`/shop/product/${product?.slug}`);
    };

    return (
        <div className="card-container">
            <div className="img" onClick={handleLinkClick}>
                <img src={product?.imagePath[0]} alt={product.title} />
            </div>
            <div className="text d-flex flex-column justify-content-between align-items-start">
                <h2>{product?.category?.name}</h2>
                <div className="product-description" onClick={handleLinkClick}>
                    <h3
                        style={{
                            fontSize:
                                windowWidth < mobileWidth ? "16px" : "20px",
                        }}
                    >
                        {product?.title?.length > 35
                            ? product.title.substring(0, 35) + "..."
                            : product.title}{" "}
                    </h3>
                    <h5
                        style={{
                            fontSize:
                                windowWidth < mobileWidth ? "14px" : "16px",
                        }}
                    >
                        {product?.description?.length > 80
                            ? product.description.substring(0, 80) + "..."
                            : product.description}
                    </h5>
                </div>
                <div
                    className="text-bottom d-flex flex-row justify-content-between align-items-center"
                    style={{ width: "100%" }}
                >
                    <h4>${product?.price}</h4>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="product-rate-box d-flex flex-row justify-content-between align-items-center">
                            <h6>
                                {product?.reviewRate
                                    ? product?.reviewRate.toFixed(2)
                                    : "No Rating"}
                            </h6>
                            <h6>
                                <AiFillStar style={{ fill: "#ffbf35" }} />
                            </h6>
                            <h6>
                                (
                                {product?.reviewNumber
                                    ? product?.reviewNumber
                                    : "0"}
                                )
                            </h6>
                        </div>
                        {modify ? (
                            <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                        `/dashboard/admin/product/update/${product.slug}`
                                    );
                                }}
                            >
                                Modify Product
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
