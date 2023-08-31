// 👻 Developed by DanBi Choi on Aug 20th, 2023.
// 👻 Developed by DanBi Choi on Aug 22th, 2023. (modulized for My Order Page)
// -----------------------------------------------------
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";
import useAddToCart from "../../hooks/useAddToCart";
import { toast } from "react-hot-toast";

export default function ProductCardVertical({ item, download = false }) {
    //hook
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const addToCart = useAddToCart();

    const handleCardClick = (e) => {
        e.preventDefault();
        navigate(`/shop/product/${item?.slug}`);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(item);
    };

    const handleDownload = (e) => {
        e.preventDefault();
        toast.error("Download feature is under construction.");
    };

    const handleWriteReview = (e) => {
        e.preventDefault();
        navigate(`/shop/product/${item?.slug}`);
    };

    return (
        <div
            className="d-flex flex-column justify-content-between align-items-start"
            style={{
                marginBottom: "5px",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                border: "1px solid rgba(219, 219, 219, 0.50)",
                backgroundColor: "#FFFEFB",
                padding: "15px",
            }}
        >
            <div
                className="img"
                style={{
                    width: "100%",
                    height: "185px",
                    borderRadius: "10px 10px 0px 0px",
                    cursor: "pointer",
                }}
                onClick={handleCardClick}
            >
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px 10px 0px 0px",
                        objectFit: "cover",
                    }}
                    src={item?.imagePath[0]}
                    alt={item?.title}
                />
            </div>
            <h3
                style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    margin: "15px 0 10px 0",
                    cursor: "pointer",
                }}
                onClick={handleCardClick}
            >
                {windowWidth > mobileWidth
                    ? item?.title?.length > 25
                        ? item?.title?.substring(0, 25) + "..."
                        : item?.title?.substring(0, 25)
                    : item?.title?.length > 80
                    ? item?.title?.substring(0, 80) + "..."
                    : item?.title?.substring(0, 80)}
            </h3>

            <div
                className="d-flex flex-row justify-content-between align-items-center"
                style={{ width: "100%" }}
            >
                {!download && (
                    <>
                        <h5
                            style={{
                                fontSize: "15px",
                                color: "#7B1FA2",
                                fontWeight: "500",
                            }}
                        >
                            ${item?.price}
                        </h5>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                padding: "7px 10px",
                                borderRadius: "10px",
                            }}
                        >
                            Add to Cart
                        </button>
                    </>
                )}
                {download && (
                    <>
                        <h5
                            onClick={handleWriteReview}
                            style={{
                                fontSize: "13px",
                                color: "#7B1FA2",
                                fontWeight: "500",
                                cursor: "pointer",
                            }}
                        >
                            Write a review
                        </h5>
                        <button
                            className="btn btn-primary"
                            onClick={handleDownload}
                            style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                padding: "7px 10px",
                                borderRadius: "10px",
                            }}
                        >
                            Download
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
