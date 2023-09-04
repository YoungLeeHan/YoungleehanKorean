// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import NewPasswordForm from "../../components/forms/NewPasswordForm";
import useScrollToTop from "../../hooks/useScrollToTop";
import { maxWidth } from "../../constants/constant";

export default function NewPassword() {
    useScrollToTop();
    return (
        <>
            <Jumbotron title={"New Password"} directory={"New Password"} />
            <div
                style={{ maxWidth: maxWidth }}
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
