// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------

import loginImg from "../../assets/images/Login/loginImg.svg";
import "../../styles/pages/Login.scss";

export default function AccountControlBox({ title, subtitle, formtype }) {
    const FormComponent = formtype;

    return (
        <div
            className="container-fluid"
            style={{ marginTop: "80px", marginBottom: "88px" }}
        >
            <div className="row">
                <div className="input-container col-md-6">
                    <h1>{title}</h1>
                    <h5>{subtitle}</h5>
                    <FormComponent />
                </div>
                <div className="img-container col-md-6">
                    <img src={loginImg} alt="Login" />
                </div>
            </div>
        </div>
    );
}
