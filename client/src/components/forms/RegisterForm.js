// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------
import lockSVG from "../../assets/images/Login/lock.svg";
import envelopeSVG from "../../assets/images/Login/envelope.svg";
import userSVG from "../../assets/images/Login/user.svg";
import "../../styles/components/cards/LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ModalInfo from "../common/ModalInfo";
import { colorPurple } from "../../constants/constant";

export default function RegisterForm() {
    // state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // hook
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        } else {
            try {
                const { data } = await axios.post(`/register`, {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                if (data?.error) {
                    toast.error(data.error);
                } else {
                    setIsModalOpen(true);
                }
            } catch (err) {
                toast.error("Registration failed. Please try again.");
                console.log(err);
            }
        }
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        console.log("google log in button clicked");
    };

    //Modal controllers
    const handleOk = () => {
        setIsModalOpen(false);
        window.scrollTo(0, 0);
        navigate("/");
    };

    const handleCancel = () => setIsModalOpen(false);

    return (
        <>
            <form onSubmit={handleRegister}>
                <ul className="registerForm d-flex flex-column justify-content-between">
                    <li>
                        <label htmlFor="firstName" className="form-label">
                            First name
                            <span>*</span>
                        </label>
                        <img src={userSVG} alt="" />
                        <input
                            type="firstName"
                            id="firstName"
                            placeholder="Your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoFocus
                        />
                    </li>
                    <li>
                        <label htmlFor="lastName" className="form-label">
                            Last name
                            <span>*</span>
                        </label>
                        <img src={userSVG} alt="" />
                        <input
                            type="lastName"
                            id="lastName"
                            placeholder="Your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </li>

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
                        />
                    </li>
                    <li>
                        <label htmlFor="password" className="form-label">
                            Password
                            <span>*</span>
                        </label>
                        <img src={lockSVG} alt="" />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                            <span>*</span>
                        </label>
                        <img src={lockSVG} alt="" />
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Type Password Again"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Password must contain the following:
                            <ul className="pw-list">
                                <li>Minimum 6 characters</li>
                                <li>A uppercase and lowercase letter</li>
                                <li>A number</li>
                                <li>A special character</li>
                            </ul>
                        </h4>
                    </li>
                    <li>
                        <button className="btn btn-primary" type="submit">
                            Create account
                        </button>
                    </li>
                    <li>
                        <h6>
                            <span>—</span> Or, Sign up with Google{" "}
                            <span>—</span>
                        </h6>
                    </li>
                    <li>
                        <button
                            className="btn btn-secondary"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle
                                size="20px"
                                style={{ marginRight: "5px" }}
                            />
                            Google
                        </button>
                    </li>
                    <li>
                        <h4>
                            Already have an account?{" "}
                            <span>
                                <Link
                                    to="/login"
                                    style={{ color: colorPurple }}
                                >
                                    Log in
                                </Link>
                            </span>
                        </h4>
                    </li>
                </ul>
            </form>
            {/* Modal for Registered User : Email Verication Sent */}
            <ModalInfo
                color={"#30a14e"}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                okBtnText={"Got it"}
                text={`Verification email sent to ${email}`}
                width={350}
            />
        </>
    );
}
