// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import LoginForm from "../../components/forms/LoginForm";
import ScrollToTop from "../../components/nav/ScrollToTop";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    ScrollToTop();

    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // redirect to user dashboard if user is logged in
    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get(`/auth-check`);
            if (data.ok) {
                navigate(`/dashboard/user`);
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token]);

    return (
        <>
            <Jumbotron title={"Login"} directory={"Login"} />
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
