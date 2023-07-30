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
import { CartProvider } from "./context/cart";
import { CartQuantityProvider } from "./context/cartQuantity";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <CartQuantityProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </CartQuantityProvider>
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
