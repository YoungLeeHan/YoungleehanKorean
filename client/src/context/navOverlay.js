// 👻 Developed by DanBi Choi on Aug 8th, 2023.
// -----------------------------------------------------
import { useState, createContext, useContext } from "react";

const NavOverlayContext = createContext();

const NavOverlayProvider = ({ children }) => {
    const [isNavOverlay, setIsNavOverlay] = useState(false);

    return (
        <NavOverlayContext.Provider value={[isNavOverlay, setIsNavOverlay]}>
            {children}
        </NavOverlayContext.Provider>
    );
};

const useNavOverlay = () => useContext(NavOverlayContext);

export { useNavOverlay, NavOverlayProvider };
