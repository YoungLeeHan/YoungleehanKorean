import UserCartSidebar from "../../components/cards/UserCartSidebar";
import Jumbotron from "../../components/cards/Jumbotron";

export default function Checkout() {
    return (
        <>
            <Jumbotron
                title={"Checkout"}
                directory={"Cart"}
                subDirectory={"Checkout"}
            />
            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div>
                    <h1>Cart</h1>
                    <UserCartSidebar />
                </div>
            </div>
        </>
    );
}
