// 👻 Developed by DanBi Choi on July 26th, 2023.
// 👻 Developed by DanBi Choi on July 29th, 2023. (Add To Cart Button)
// 👻 Developed by DanBi Choi on Aug 20th, 2023. (Add To Cart Modulized)
// -----------------------------------------------------
import { useNavigate } from "react-router-dom";
import "../../styles/components/cards/ProductCardHorizontal.scss";
import { AiFillStar } from "react-icons/ai";
import useWindowWidth from "../../hooks/useWindowWidth";
import useAddToCart from "../../hooks/useAddToCart";

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
                <img
                    src={`${process.env.REACT_APP_API}/product/images/${product._id}`}
                    alt={product.title}
                />
            </div>
            <div className="text d-flex flex-column justify-content-between align-items-start">
                <h2>{product?.category?.name}</h2>
                <h3 onClick={handleLinkClick}>
                    {windowWidth > 450 &&
                        (product?.title?.length > 35
                            ? product?.title?.substring(0, 35) + "..."
                            : product?.title)}
                    {windowWidth < 450 &&
                        (product?.title?.length > 25
                            ? product?.title?.substring(0, 25) + "..."
                            : product?.title)}
                </h3>
                <h5 onClick={handleLinkClick}>
                    {windowWidth > 1200 &&
                        (product?.description?.length > 140
                            ? product?.description.substring(0, 140) + "..."
                            : product?.description)}
                    {windowWidth < 1200 &&
                        (product?.description?.length > 70
                            ? product?.description.substring(0, 70) + "..."
                            : product?.description)}
                </h5>

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
