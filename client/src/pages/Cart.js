// 👻 Developed by DanBi Choi on July 29th, 2023.
// -----------------------------------------------------
import "../styles/pages/Cart.scss";
import Jumbotron from "../components/cards/Jumbotron";
import ScrollToTop from "../components/nav/ScrollToTop";
import { useCart } from "../context/cart";
import { useCartQuantity } from "../context/cartQuantity";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

export default function Cart() {
    return (
        <>
            <div>
                <h1>Cart</h1>
                <UserCartSidebar />
            </div>
        </>
    );
}
