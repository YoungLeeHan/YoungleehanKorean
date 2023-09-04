// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------

import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import useScrollToTop from "../../hooks/useScrollToTop";
import { maxWidth } from "../../constants/constant";

export default function ForgotPassword() {
    useScrollToTop();
    return (
        <>
            <Jumbotron
                title={"Forgot Password"}
                directory={"Forgot Password"}
            />
            <div
                style={{ maxWidth: maxWidth }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <AccountControlBox
                    title={"Forgot Password"}
                    subtitle={
                        "Don’t worry! We will help you to find your account."
                    }
                    formtype={ForgotPasswordForm}
                />
            </div>
        </>
    );
}
