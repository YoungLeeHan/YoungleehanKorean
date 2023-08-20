// 👻 Developed by DanBi Choi on Aug 20th, 2023.
// -----------------------------------------------------
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";

export default function ProductCardVertical({ item }) {
    //hook
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    const handleAddToCart = (e) => {
        e.preventDefault();
        // TO DO: add to cart feature
        console.log("add to cart clicked");
    };

    const handleCardClick = (e) => {
        e.preventDefault();
        navigate(`/shop/product/${item?.slug}`);
    };

    return (
        <div
            className="d-flex flex-column justify-content-between align-items-start"
            style={{
                marginBottom: "30px",
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
                    src={`${process.env.REACT_APP_API}/product/images/${item?._id}`}
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
                <h5
                    style={{
                        fontSize: "13px",
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
            </div>
        </div>
    );
}
