// 👻 Developed by DanBi Choi on Aug 20th, 2023. (Add To Cart Modulized)
// -----------------------------------------------------

import { useCart } from "../context/cart";
import { useCartQuantity } from "../context/cartQuantity";
import { toast } from "react-hot-toast";

export default function useAddToCart(product) {
    //states
    const [cart, setCart] = useCart();
    const [cartQuantity, setCartQuantity] = useCartQuantity();

    const addToCart = (product) => {
        try {
            // isProductInCart returns true if product is found
            const isProductInCart = cart.some(
                (item) => item._id === product._id
            );
            if (!isProductInCart) setCart([...cart, product]);
            setCartQuantity((prev) => ({
                ...prev,
                [product._id]: prev[product._id] + 1 || 1,
            }));
            // localStorage.setItem("cart", JSON.stringify([...cart, product]));
            toast.success("Item added to cart!");
        } catch (err) {
            toast.error("Failed. Please try again.");
        }
    };

    return addToCart;
}
