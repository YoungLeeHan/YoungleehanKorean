import ProductCardVertical from "./ProductCardVertical";
import moment from "moment";

export default function MyOrderCard({ order }) {
    return (
        <div
            style={{
                width: "100%",
                borderRadius: "10px",
                border: "1px solid rgba(219, 219, 219, 0.50)",
                backgroundColor: "#FFFEFB",
                padding: "20px",
                margin: "15px 0",
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
