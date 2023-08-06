import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useCartTotal } from "../../context/cartTotal";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

export default function UserCartSidebar() {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [cartTotal, setCartTotal] = useCartTotal();

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/braintree/token");
            // {data} is from the response we get from getToken function
            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBuy = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            console.log("nonce => ", nonce);
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cartTotal,
            });
            console.log("handle buy response => ", data);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment successful");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="col-md-6 mt-5 mb-5">
            <h3>
                Your order will be sent to: {JSON.stringify(auth?.user?.email)}
            </h3>
            <div className="mt-3 mb-3">
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
                disabled={!cart?.length || !auth?.user?.email || !instance}
            >
                Buy
            </button>
        </div>
    );
}
