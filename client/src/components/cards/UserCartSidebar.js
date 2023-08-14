import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useCartQuantity } from "../../context/cartQuantity";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import useWindowWidth from "./../../hooks/useWindowWidth";
import loadingGIF from "../../assets/images/Common/loading.gif";

export default function UserCartSidebar() {
    //hooks
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [cartQuantity, setCartQuantity] = useCartQuantity();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    //states
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/braintree/token");
            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBuy = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cart,
                cartQuantity,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            setCartQuantity({});
            setInstance("");
            console.log(data);
            toast.success("Payment successful");
            navigate(`/cart/checkout/success/${data.orderId}`);
        } catch (err) {
            if (err.name === "DropinError") {
                toast.error(err.message);
                setLoading(false);
            } else {
                navigate("/cart/checkout/fail");
            }
        }
    };

    return (
        <>
            <div style={windowWidth < 767 ? { margin: "70px 0" } : null}>
                {!clientToken && (
                    <img
                        src={loadingGIF}
                        alt="Loading..."
                        style={{
                            width: "50px",
                            height: "50px",
                            margin: "100px",
                        }}
                    />
                )}
                {clientToken && (
                    <DropIn
                        options={{
                            authorization: clientToken,
                            paypal: {
                                flow: "vault",
                            },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                    />
                )}
            </div>
            <button
                onClick={handleBuy}
                className="btn btn-primary col-12 mt-2"
                disabled={
                    !cart?.length || !auth?.user?.email || !instance || loading
                }
            >
                {loading ? "Processing..." : "Buy"}
            </button>
        </>
    );
}
