// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------

import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import ScrollToTop from "../../components/nav/ScrollToTop";

export default function ForgotPassword() {
    ScrollToTop();
    return (
        <>
            <Jumbotron
                title={"Forgot Password"}
                directory={"Forgot Password"}
            />
            <div
                style={{ maxWidth: "1170px" }}
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
