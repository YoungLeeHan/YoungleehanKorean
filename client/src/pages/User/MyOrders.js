// 👻 Developed by DanBi Choi on Aug 22th, 2023.
// -----------------------------------------------------
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyOrderCard from "../../components/cards/MyOrderCard";
import useScrollToTop from "../../hooks/useScrollToTop";
import NoOrderDisplay from "../../components/common/NoOrderDisplay";
import Loading from "../../components/common/Loading";
import { maxWidth } from "../../constants/constant";

export default function MyOrders() {
    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useScrollToTop();

    //states
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                style={{ maxWidth: maxWidth, minHeight: "400px" }}
                className="container-fluid"
            >
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={0} />
                    </div>
                    <div className="col-md-9">
                        {isLoading && <Loading />}
                        {!isLoading && orders?.length < 1 && <NoOrderDisplay />}
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
