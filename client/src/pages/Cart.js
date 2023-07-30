// 👻 Developed by DanBi Choi on July 29th, 2023.
// -----------------------------------------------------
import "../styles/pages/Cart.scss";
import Jumbotron from "../components/cards/Jumbotron";
import ScrollToTop from "../components/nav/ScrollToTop";
import { useCart } from "../context/cart";
import { useState } from "react";
import { useCartQuantity } from "../context/cartQuantity";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

export default function Cart() {
    ScrollToTop();

    //hooks
    const [cart, setCart] = useCart();
    const [cartQuantity, setCartQuantity] = useCartQuantity();

    const handleDelete = (idToDelete) => {
        const newCart = cart.filter((product) => product._id !== idToDelete);
        setCart(newCart);
        setCartQuantity((prev) => ({ ...prev, [idToDelete]: 0 }));
    };

    const handleQuantityChange = (direction, itemId) => {
        let num;
        if (direction === "up") num = 1;
        if (direction === "down") num = -1;
        setCartQuantity((prev) => ({
            ...prev,
            [itemId]: cartQuantity[itemId] + num,
        }));
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
                        <h3 style={{ textAlign: "center" }}>
                            Your cart is empty!
                        </h3>
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
                                return (
                                    <tr key={item?._id}>
                                        <td className="product-info">
                                            <Link to={`/shop/${item?.slug}`}>
                                                <div className="img">
                                                    <img
                                                        src={item?.image}
                                                        alt={item?.title}
                                                    />
                                                </div>
                                                <h3>{item?.title}</h3>{" "}
                                            </Link>
                                        </td>

                                        <td>
                                            <h4>${item?.price}</h4>
                                        </td>
                                        <td className="td-quantity">
                                            <div className="control-box d-flex flex-row justify-content-end align-items-center">
                                                <h4>
                                                    {cartQuantity[item._id]}
                                                </h4>
                                                <div className="arrow-box d-flex flex-column">
                                                    <button
                                                        className="arrow-btn"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleQuantityChange(
                                                                "up",
                                                                item._id
                                                            );
                                                        }}
                                                    >
                                                        <BiSolidUpArrow
                                                            size="10px"
                                                            fill="#B4B1B1"
                                                        />
                                                    </button>
                                                    <button
                                                        className="arrow-btn"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleQuantityChange(
                                                                "down",
                                                                item._id
                                                            );
                                                        }}
                                                        disabled={
                                                            cartQuantity[
                                                                item._id
                                                            ] === 1
                                                        }
                                                    >
                                                        <BiSolidDownArrow
                                                            size="10px"
                                                            fill="#B4B1B1"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h4>
                                                <span>
                                                    $
                                                    {(
                                                        item?.price *
                                                        cartQuantity[item._id]
                                                    ).toFixed(2)}
                                                </span>
                                            </h4>
                                        </td>
                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={(e) => {
                                                    handleDelete(item._id);
                                                }}
                                            >
                                                <TiDelete
                                                    fill="#ffbf35"
                                                    size={20}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}
