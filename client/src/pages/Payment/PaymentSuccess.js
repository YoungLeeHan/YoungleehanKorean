// 👻 Developed by DanBi Choi on Aug 7th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Link, useNavigate } from "react-router-dom";
import SuccessSVG from "../../assets/images/Checkout/PaymentSuccess.svg";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import useWindowWidth from "./../../hooks/useWindowWidth";

export default function PaymentSuccess() {
    useScrollToTop();

    //hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    //state
    const [orderId, setOrderId] = useState();

    // redirect anonymous user
    useEffect(() => {
        if (!auth?.token) navigate("/login");
        if (auth?.token) getOrderNumber();
    }, []);

    const getOrderNumber = async () => {
        try {
            const { data } = await axios.get(`/recent-order`);
            setOrderId(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron title={"Checkout"} directory={"Checkout Result"} />
            <div
                style={{ maxWidth: "1170px", minHeight: "750px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div
                    className="payment-result-box container-fluid d-flex flex-column justify-content-center align-items-center text-center"
                    style={{ marginTop: "68px" }}
                >
                    <img src={SuccessSVG} alt="Successful" />
                    <h1
                        style={{
                            fontSize: "32px",
                            color: "#7B1FA2",
                            fontWeight: "600",
                            margin: "0",
                        }}
                    >
                        Thank you for your order!
                    </h1>

                    <h3
                        style={{
                            margin: "25px 0",
                            color: "#706866",
                            fontSize: "20px",
                        }}
                    >
                        Your order #{orderId} was successfully created.
                    </h3>
                    <div className="button-box d-flex flex-row justify-content-center align-items-center">
                        <Link to="/">
                            <button
                                className="btn btn-outline-primary"
                                style={{
                                    width: "150px",
                                    marginRight: "20px",
                                    borderRadius: "10px",
                                    padding: "12px 15px",
                                }}
                            >
                                Back Home
                            </button>
                        </Link>
                        <Link to="/dashboard/user/orders">
                            <button
                                className="btn btn-primary"
                                style={{
                                    width: "150px",
                                    borderRadius: "10px",
                                    padding: "12px 15px",
                                }}
                            >
                                View My Order
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
