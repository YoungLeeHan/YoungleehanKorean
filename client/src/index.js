import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import store from "./Reducer/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from "./context/cart";
import { CartQuantityProvider } from "./context/cartQuantity";
import { CartTotalProvider } from "./context/cartTotal";
import { NavOverlayProvider } from "./context/navOverlay";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId="1068188557030-175p3hpav952phkcd1hp14ti2kb0h2rk.apps.googleusercontent.com">
        <React.StrictMode>
            <NavOverlayProvider>
                <AuthProvider>
                    <CartProvider>
                        <CartQuantityProvider>
                            <CartTotalProvider>
                                <Provider store={store}>
                                    <App />
                                </Provider>
                            </CartTotalProvider>
                        </CartQuantityProvider>
                    </CartProvider>
                </AuthProvider>
            </NavOverlayProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);

reportWebVitals();
