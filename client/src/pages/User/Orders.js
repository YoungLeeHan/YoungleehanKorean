import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyOrderCard from "../../components/cards/MyOrderCard";

export default function UserOrders() {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    // redirect anonymous user
    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/orders");
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello, ${auth?.user?.firstName}!`}
                directory={"Dashboard"}
                subDirectory={"My Order"}
            />
            <div
                style={{ maxWidth: "1170px", minHeight: "300px" }}
                className="container-fluid"
            >
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={2} />
                    </div>
                    <div className="col-md-9">
                        {orders?.length < 1 && (
                            <h5
                                className="d-flex flex-column justify-content-center align-items-center"
                                style={{ minHeight: "200px" }}
                            >
                                No order has been placed yet.
                            </h5>
                        )}
                        {orders?.length > 0 &&
                            orders.map((order) => (
                                <MyOrderCard key={order._id} order={order} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
