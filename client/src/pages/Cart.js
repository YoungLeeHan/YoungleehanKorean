// 👻 Developed by DanBi Choi on July 29th, 2023.
// -----------------------------------------------------
import "../styles/pages/Cart.scss";
import Jumbotron from "../components/cards/Jumbotron";
import ScrollToTop from "../components/nav/ScrollToTop";
import { useCart } from "../context/cart";
import { useCartQuantity } from "../context/cartQuantity";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { useCartTotal } from "../context/cartTotal";
import CartProductCard from "./../components/cards/CartProductCard";

export default function Cart() {
    ScrollToTop();

    //hooks
    const [cart, setCart] = useCart();
    const [cartQuantity, setCartQuantity] = useCartQuantity();
    const [cartTotal, setCartTotal] = useCartTotal();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // Delete single item
    const handleDelete = (idToDelete) => {
        const newCart = cart.filter((product) => product._id !== idToDelete);
        setCart(newCart);
        setCartQuantity((prev) => ({ ...prev, [idToDelete]: 0 }));
    };

    // Quantity Change Handler
    const handleQuantityChange = (direction, itemId) => {
        let num;
        if (direction === "up") num = 1;
        if (direction === "down") num = -1;
        setCartQuantity((prev) => ({
            ...prev,
            [itemId]: cartQuantity[itemId] + num,
        }));
    };

    // Cart Total Calculator
    useEffect(() => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cartQuantity[cart[i]._id];
        }
        setCartTotal(total.toFixed(2));
    }, [cart, cartQuantity]);

    // Checkout Button
    const handleCheckout = (e) => {
        e.preventDefault();
        if (auth?.token) {
            navigate("/cart/checkout");
        } else {
            toast.error("You need to login first to check out!");
            navigate("/login");
        }
    };

    return (
        <>
            <Jumbotron title={"Cart"} directory={"Cart"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="cart-box container-fluid">
                    {!cart?.length && (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3>Your cart is empty!</h3>
                            <Link to="/shop">
                                <button className="btn btn-primary goShopBtn">
                                    Go to Shop
                                </button>
                            </Link>
                        </div>
                    )}
                    {cart?.length > 0 && (
                        <table>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th> </th>
                            </tr>
                            {cart?.map((item) => {
                                <CartProductCard
                                    item={item}
                                    cartQuantity={cartQuantity}
                                    handleDelete={handleDelete}
                                    handleQuantityChange={handleQuantityChange}
                                />;
                            })}
                        </table>
                    )}
                    {cart?.length > 0 && (
                        <div className="total-box">
                            <ul>
                                <li>
                                    <h3>Cart Total</h3>
                                </li>
                                <li>
                                    <h4>Subtotal</h4>
                                    <h5>${cartTotal}</h5>
                                </li>
                                <li>
                                    <h4>Shipping</h4>
                                    <h5>Free</h5>
                                </li>
                                <li>
                                    <h4>Total</h4>
                                    <h5>${cartTotal}</h5>
                                </li>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
