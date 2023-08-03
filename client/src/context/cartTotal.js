// 👻 Developed by DanBi Choi on Aug 1st, 2023.
// -----------------------------------------------------
import { useState, createContext, useContext } from "react";

const CartTotalContext = createContext();

const CartTotalProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <CartTotalContext.Provider value={[cartTotal, setCartTotal]}>
      {children}
    </CartTotalContext.Provider>
  );
};

const useCartTotal = () => useContext(CartTotalContext);

export { useCartTotal, CartTotalProvider };
