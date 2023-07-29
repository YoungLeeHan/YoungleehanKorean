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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider>
      <AuthProvider>
        {/* <BrowserRouter> */}
        <Provider store={store}>
          <App />
        </Provider>
        {/* </BrowserRouter> */}
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
