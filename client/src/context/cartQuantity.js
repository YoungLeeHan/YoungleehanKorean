// 👻 Developed by DanBi Choi on July 29th, 2023.
// -----------------------------------------------------
import { useState, createContext, useContext } from "react";

const CartQuantityContext = createContext();

const CartQuantityProvider = ({ children }) => {
    const [cartQuantity, setCartQuantity] = useState({});

    return (
        <CartQuantityContext.Provider value={[cartQuantity, setCartQuantity]}>
            {children}
        </CartQuantityContext.Provider>
    );
};

const useCartQuantity = () => useContext(CartQuantityContext);

export { useCartQuantity, CartQuantityProvider };
