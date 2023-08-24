// 👻 Developed by DanBi Choi on Aug 7th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Link } from "react-router-dom";
import FailSVG from "../../assets/images/Checkout/PaymentFail.svg";
import useWindowWidth from "./../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";

export default function PaymentFail() {
    //hooks
    useScrollToTop();
    const windowWidth = useWindowWidth();

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
                    <img src={FailSVG} alt="Failed" />
                    <h1
                        style={{
                            fontSize:
                                windowWidth < mobileWidth ? "20px" : "32px",
                            color: "#7B1FA2",
                            fontWeight: "600",
                            margin: "0",
                        }}
                    >
                        Something went wrong. Please try again.
                    </h1>

                    <h3
                        style={{
                            margin: "25px 0",
                            color: "#706866",
                            fontSize:
                                windowWidth < mobileWidth ? "14px" : "20px",
                        }}
                    >
                        If issue persist, please contact site owner.
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
                        <Link to="/cart">
                            <button
                                className="btn btn-primary"
                                style={{
                                    width: "150px",
                                    borderRadius: "10px",
                                    padding: "12px 15px",
                                }}
                            >
                                Back to Cart
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
