// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import AccountControlBox from "../../components/cards/AccountControlBox";
import VerificationForm from "../../components/forms/VerificationForm";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Verification() {
    useScrollToTop();
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
