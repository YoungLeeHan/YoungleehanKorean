// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import VerificationForm from "../../components/forms/VerificationForm";
import ScrollToTop from "../../components/nav/ScrollToTop";

export default function Verification() {
    ScrollToTop();
    return (
        <>
            <Jumbotron title={"Verification"} directory={"Verification"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <AccountControlBox
                    title={"Verification"}
                    subtitle={"Please enter verification code."}
                    formtype={VerificationForm}
                />
            </div>
        </>
    );
}
