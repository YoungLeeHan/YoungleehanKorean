import UserCartSidebar from "../../components/cards/UserCartSidebar";
import Jumbotron from "../../components/cards/Jumbotron";
import { useCartTotal } from "../../context/cartTotal";

export default function Checkout() {
    // hooks
    const [cartTotal, setCartTotal] = useCartTotal();

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
