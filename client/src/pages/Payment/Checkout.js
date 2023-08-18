import PaymentMethodInput from "../../components/cards/PaymentMethodInput";
import Jumbotron from "../../components/cards/Jumbotron";
import { useCartTotal } from "../../context/cartTotal";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CartTotalBox from "../../components/cards/CartTotalBox";

export default function Checkout() {
  // hooks
  const [cartTotal, setCartTotal] = useCartTotal();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // redirect anonymous user
  useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Jumbotron
        title={"Checkout"}
        directory={"Cart"}
        subDirectory={"Checkout"}
      />
      <div style={{ maxWidth: "1170px" }} className="container-fluid">
        <div>
          <div className="row" style={{ margin: "75px 0" }}>
            <div className="col-md-6">
              <CartTotalBox />
            </div>
            <div className="col-md-6">
              <PaymentMethodInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
