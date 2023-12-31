import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useCartQuantity } from "../../context/cartQuantity";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";
import Loading from "../common/Loading";

export default function PaymentMethodInput() {
    //hooks
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [cartQuantity, setCartQuantity] = useCartQuantity();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    //states
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cart,
                cartQuantity,
            });
            setIsLoading(false);
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
                setIsLoading(false);
            } else {
                navigate("/cart/checkout/fail");
            }
        }
    };

    return (
        <>
            <div
                style={windowWidth < mobileWidth ? { margin: "70px 0" } : null}
            >
                {!clientToken && <Loading />}
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
                    !cart?.length ||
                    !auth?.user?.email ||
                    !instance ||
                    isLoading
                }
            >
                {isLoading ? "Processing..." : "Buy"}
            </button>
        </>
    );
}
