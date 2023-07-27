import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./context/auth"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
