// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------

import lockSVG from "../../assets/images/Login/lock.svg";
import "../../styles/components/cards/LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { colorPurple } from "../../constants/constant";

export default function NewPasswordForm() {
    // state
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // hook
    const navigate = useNavigate();

    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            toast.error(
                "Your password do not match. \nCheck your password again."
            );
        } else {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_API}/지정필요`,
                    { password2 }
                );
                if (data?.error) {
                    toast.error(data.error);
                } else {
                    console.log("setting new password button clicked");
                    toast.success(`You password is reset.`);
                    navigate("/login");
                }
            } catch (err) {
                toast.error("Password reset failed. \nPlease try again.");
                console.log(err);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSetNewPassword}>
                <ul className="newPasswordForm d-flex flex-column justify-content-between">
                    <li>
                        <label htmlFor="password1" className="form-label">
                            Enter New Password
                            <span>*</span>
                        </label>
                        <img src={lockSVG} alt="" />
                        <input
                            type="password"
                            id="password1"
                            placeholder=""
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            autoFocus
                        />
                    </li>
                    <li>
                        <label htmlFor="password2" className="form-label">
                            Confirm Password
                            <span>*</span>
                        </label>
                        <img src={lockSVG} alt="" />
                        <input
                            type="password"
                            id="password2"
                            placeholder=""
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </li>
                    <li>
                        <h4
                            style={{
                                color: colorPurple,
                                textAlign: "start",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            For password you need:
                            <ul className="pw-list">
                                <li>Use at least 6 characters</li>
                                <li>Use upper and lower case characters</li>
                                <li>Use 1 or more numbers</li>
                                <li>Optionally use special characters</li>
                            </ul>
                        </h4>
                    </li>

                    <li>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            style={{ marginTop: "34px" }}
                        >
                            Reset Password
                        </button>
                    </li>
                </ul>
            </form>
        </>
    );
}
