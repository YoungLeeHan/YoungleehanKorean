import UserCartSidebar from "../../components/cards/UserCartSidebar";
import Jumbotron from "../../components/cards/Jumbotron";
import { useCartTotal } from "../../context/cartTotal";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
                    <h1>
                        Total amount to be charged:
                        {JSON.stringify(cartTotal, null, 4)}
                    </h1>
                    <h1>Cart</h1>
                    <UserCartSidebar />
                </div>
            </div>
        </>
    );
}
