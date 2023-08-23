import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyOrderCard from "../../components/cards/MyOrderCard";
import loadingGIF from "../../assets/images/Common/loading.gif";
import useScrollToTop from "./../../hooks/useScrollToTop";

export default function UserOrders() {
    //hooks
    const [auth, setAuth] = useAuth();
    useScrollToTop();

    //states
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        try {
            const { data } = await axios.get("/orders");
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
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
                        <DashboardMenu id={3} />
                    </div>
                    <div className="col-md-9">
                        {isLoading && (
                            <div
                                className="d-flex justify-content-center"
                                style={{ margin: "200px 0" }}
                            >
                                <img
                                    src={loadingGIF}
                                    alt="Loading"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
                            </div>
                        )}
                        {!isLoading && orders?.length < 1 && (
                            <h5
                                className="d-flex flex-column justify-content-center align-items-center"
                                style={{ minHeight: "200px" }}
                            >
                                No order has been placed yet.
                            </h5>
                        )}
                        {!isLoading &&
                            orders?.length > 0 &&
                            orders.map((order) => (
                                <MyOrderCard key={order._id} order={order} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
