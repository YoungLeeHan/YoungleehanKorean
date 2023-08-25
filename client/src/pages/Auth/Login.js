// 👻 Developed by DanBi Choi on July 24th, 2023.
// 👻 Developed by DanBi Choi on Aug 1st, 2023. (page redirection added)
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import LoginForm from "../../components/forms/LoginForm";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    useScrollToTop();

    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // redirect to user dashboard if user is logged in
    useEffect(() => {
        if (auth?.token) {
            navigate("/dashboard/user/orders");
        }
    }, []);

    return (
        <>
            <Jumbotron title={"Log in"} directory={"Log in"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <AccountControlBox
                    title={"Log in to your Account"}
                    subtitle={"Welcome back! Please enter your details."}
                    formtype={LoginForm}
                />
            </div>
        </>
    );
}
