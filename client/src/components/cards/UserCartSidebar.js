import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useCartQuantity } from "../../context/cartQuantity";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

export default function UserCartSidebar() {
  //hooks
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [cartQuantity, setCartQuantity] = useCartQuantity();
  const navigate = useNavigate();

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
      // console.log("buy response => ", data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      setCartQuantity({});
      setInstance("");
      navigate("/cart/checkout/success");
      toast.success("Payment successful");
    } catch (err) {
      navigate("/cart/checkout/fail");
      toast.error(err.message);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="col-md-6 mt-5 mb-5">
      <h3>Your order will be sent to: {JSON.stringify(auth?.user?.email)}</h3>
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
        disabled={!cart?.length || !auth?.user?.email || !instance || loading}
      >
        {loading ? "Processing..." : "Buy"}
      </button>
    </div>
  );
}
