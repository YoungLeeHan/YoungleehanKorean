// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import LoginForm from "../../components/forms/LoginForm";
import ScrollToTop from "../../components/nav/ScrollToTop";

export default function Login() {
    ScrollToTop();

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
