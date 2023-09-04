// 👻 Developed by DanBi Choi on Aug 9th, 2023.
// -----------------------------------------------------
import PaymentMethodInput from "../../components/cards/PaymentMethodInput";
import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CartTotalBox from "../../components/cards/CartTotalBox";
import useScrollToTop from "../../hooks/useScrollToTop";
import { maxWidth } from "../../constants/constant";

export default function Checkout() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useScrollToTop();

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
            <div style={{ maxWidth: maxWidth }} className="container-fluid">
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
