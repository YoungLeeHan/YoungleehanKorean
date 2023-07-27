// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------

import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import RegisterForm from "../../components/forms/RegisterForm";
import ScrollToTop from "../../components/nav/ScrollToTop";

export default function Register() {
    ScrollToTop();
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
