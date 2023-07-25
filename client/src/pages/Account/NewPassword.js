// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import NewPasswordForm from "../../components/forms/NewPasswordForm";
import ScrollToTop from "../../components/nav/ScrollToTop";

export default function NewPassword() {
    ScrollToTop();
    return (
        <>
            <Jumbotron title={"New Password"} directory={"New Password"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <AccountControlBox
                    title={"New Password"}
                    subtitle={"Please set a new password."}
                    formtype={NewPasswordForm}
                />
            </div>
        </>
    );
}
