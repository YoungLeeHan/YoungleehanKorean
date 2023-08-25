import ProductCardVertical from "./ProductCardVertical";
import moment from "moment";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";

export default function MyOrderCard({ order }) {
    const windowWidth = useWindowWidth();

    return (
        <div
            style={{
                width: "100%",
                borderRadius: "10px",
                border: "1px solid rgba(219, 219, 219, 0.50)",
                backgroundColor: "#FFFEFB",
                padding: "20px",
                marginBottom: "15px",
                marginTop: windowWidth < mobileWidth ? "15px" : "",
            }}
        >
            <ul
                style={{
                    fontSize: "14px",
                    marginBottom: "10px",
                }}
            >
                <li>
                    <b>Order #{order._id}</b>
                </li>
                <hr />
                <li style={{ color: "#706866" }}>
                    • Placed on:{" "}
                    {moment(order.createdAt).format("MM-DD-YYYY [at] hh:mm a")}{" "}
                    ({moment(order.createdAt).fromNow()})
                </li>
                <li style={{ color: "#706866" }}>
                    • Total: ${order.payment.transaction.amount}
                </li>
            </ul>
            <div className="row" style={{ width: "100%" }}>
                {order?.products.map((product) => (
                    <div
                        className="col-md-4 d-flex flex-column justify-content-between align-items-center"
                        key={product._id}
                    >
                        <ProductCardVertical item={product} download={true} />
                    </div>
                ))}
            </div>
        </div>
    );
}
