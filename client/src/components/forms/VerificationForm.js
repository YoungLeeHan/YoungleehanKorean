// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------

import "../../styles/components/cards/LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { colorPurple } from "../../constants/constant";

export default function VerificationForm() {
    // state
    const [code, setCode] = useState("");

    // hook
    const navigate = useNavigate();

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/지정필요`,
                { code }
            );
            if (data?.error) {
                toast.error(data.error);
            } else {
                navigate("/newpassword");
            }
        } catch (err) {
            toast.error("Verification failed. \nPlease try again.");
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleVerifyCode}>
                <ul className="verificationForm d-flex flex-column justify-content-between">
                    <li>
                        <label htmlFor="code" className="form-label">
                            Enter Verification Code
                            <span>*</span>
                        </label>

                        <input
                            type="code"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ paddingLeft: "20px" }}
                            autoFocus
                        />
                    </li>
                    <li>
                        <h4 style={{ textAlign: "left", marginBottom: "23px" }}>
                            If you didn't receive a code,{" "}
                            <span>
                                <Link
                                    to="/register"
                                    style={{ color: colorPurple }}
                                >
                                    Resend
                                </Link>
                            </span>
                        </h4>
                    </li>
                    <li>
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </li>
                </ul>
            </form>
        </>
    );
}
