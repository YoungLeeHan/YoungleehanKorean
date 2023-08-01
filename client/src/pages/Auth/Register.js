// 👻 Developed by DanBi Choi on July 24th, 2023.
// 👻 Developed by DanBi Choi on Aug 1st, 2023. (page redirection added)
// -----------------------------------------------------

import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import RegisterForm from "../../components/forms/RegisterForm";
import ScrollToTop from "../../components/nav/ScrollToTop";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
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
            <Jumbotron title={"Sign Up"} directory={"Sign Up"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <AccountControlBox
                    title={"Create New Account"}
                    subtitle={
                        "Create your account. Enjoy exclusive features and many more."
                    }
                    formtype={RegisterForm}
                />
            </div>
        </>
    );
}
