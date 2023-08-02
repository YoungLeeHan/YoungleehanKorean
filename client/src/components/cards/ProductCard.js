// 👻 Developed by DanBi Choi on July 26th, 2023.
// 👻 Developed by DanBi Choi on July 29th, 2023. (Add To Cart Button)
// -----------------------------------------------------

import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { AiFillStar } from "react-icons/ai";
import { useCart } from "../../context/cart";
import { useCartQuantity } from "../../context/cartQuantity";
import { toast } from "react-hot-toast";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function ProductCard({ product }) {
    // hooks
    const windowWidth = useWindowWidth();
    const [cart, setCart] = useCart();
    const [cartQuantity, setCartQuantity] = useCartQuantity();

    const handleAddToCart = (e) => {
        e.preventDefault();
        try {
            const productInCart = cart.some((item) => item._id === product._id); // returns true if product is found
            if (!productInCart) setCart([...cart, product]);
            setCartQuantity((prev) => ({
                ...prev,
                [product._id]: prev[product._id] + 1 || 1,
            }));
            toast.success("Item added to cart!");
        } catch (err) {
            toast.error("Failed. Please try again.");
        }
    };

    return (
        <div className="card-container">
            <div className="img">
                <Link to={`product/${product?.slug}`}>
                    <img
                        src={`${process.env.REACT_APP_API}/product/images/${product._id}`}
                        alt={product.title}
                    />
                </Link>
            </div>
            <div className="text d-flex flex-column justify-content-between align-items-between">
                <Link to={`product/${product?.slug}`}>
                    <h3>
                        {windowWidth > 450 &&
                            (product?.title?.length > 35
                                ? product?.title?.substring(0, 35) + "..."
                                : product?.title)}
                        {windowWidth < 450 &&
                            (product?.title?.length > 25
                                ? product?.title?.substring(0, 25) + "..."
                                : product?.title)}
                    </h3>
                    <h5>
                        {windowWidth > 1200 &&
                            (product?.description?.length > 140
                                ? product?.description.substring(0, 140) + "..."
                                : product?.description)}
                        {windowWidth < 1200 &&
                            (product?.description?.length > 70
                                ? product?.description.substring(0, 70) + "..."
                                : product?.description)}
                    </h5>
                </Link>

                <div className="text-bottom d-flex flex-row justify-content-between">
                    <h4>${product?.price}</h4>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="product-rate-box d-flex flex-row justify-content-between align-items-center">
                            <h6>
                                {product?.reviewRate
                                    ? product?.reviewRate
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
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
