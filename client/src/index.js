import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import store from "./Reducer/store";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import { CartQuantityProvider } from "./context/cartQuantity";
import { CartTotalProvider } from "./context/cartTotal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider>
            <AuthProvider>
                <SearchProvider>
                    <CartProvider>
                        <CartQuantityProvider>
                            <CartTotalProvider>
                                <Provider store={store}>
                                    <App />
                                </Provider>
                            </CartTotalProvider>
                        </CartQuantityProvider>
                    </CartProvider>
                </SearchProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

reportWebVitals();
