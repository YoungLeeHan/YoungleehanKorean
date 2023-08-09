// 👻 Developed by DanBi Choi on Aug 9th, 2023.
// -----------------------------------------------------
import "../../styles/components/cards/CartTotalBox.scss";
import { useCartTotal } from "../../context/cartTotal";

export default function CartTotalBox({ handleCheckout }) {
    const [cartTotal, setCartTotal] = useCartTotal();

    return (
        <div
            className="cart-total-box"
            style={handleCheckout ? { marginTop: "60px" } : { width: "100%" }}
        >
            <ul>
                <li>
                    <h3>
                        {handleCheckout ? "Cart Total" : "Checkout Summary"}
                    </h3>
                </li>
                <li>
                    <h4>Subtotal</h4>
                    <h5>${cartTotal}</h5>
                </li>
                {!handleCheckout && (
                    <li>
                        {/* TODO: Apply sales tax and calculate total amount accordingly */}
                        <h4>Sales Tax (0%)</h4>
                        <h5>$0.00</h5>
                    </li>
                )}
                <li>
                    <h4>Shipping</h4>
                    <h5>Free</h5>
                </li>
                <li>
                    <h4>Total</h4>
                    <h5>${cartTotal}</h5>
                </li>
                {handleCheckout && (
                    <button
                        className="btn btn-primary"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                )}
            </ul>
        </div>
    );
}
