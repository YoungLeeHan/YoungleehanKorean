// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------

import envelopeSVG from "../../assets/images/Login/envelope.svg";
import "../../styles/components/cards/LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
    // state
    const [email, setEmail] = useState("");

    // hook
    const navigate = useNavigate();

    const handleFindExistingEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/지정필요`,
                { email }
            );
            if (data?.error) {
                toast.error(data.error);
            } else {
                // useHistory를 이용해서 다음 페이지로 user정보 전달.
                navigate("/verification");
            }
        } catch (err) {
            toast.error("Finding your account failed. \nPlease try again.");
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleFindExistingEmail}>
                <ul className="forgotPasswordForm d-flex flex-column justify-content-between">
                    <li>
                        <label htmlFor="email" className="form-label">
                            Email
                            <span>*</span>
                        </label>
                        <img src={envelopeSVG} alt="" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </li>
                    <li>
                        <h3>
                            <Link
                                to="/login"
                                style={{
                                    color: "#7b1fa2",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                }}
                            >
                                Back to Log in
                            </Link>
                        </h3>
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
