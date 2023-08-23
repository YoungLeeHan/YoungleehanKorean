// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------

import lockSVG from "../../assets/images/Login/lock.svg";
import envelopeSVG from "../../assets/images/Login/envelope.svg";
import "../../styles/components/cards/LoginForm.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import ModalInfo from "../common/ModalInfo";

export default function LoginForm() {
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // hook
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter all required fields.");
        } else {
            try {
                const { data } = await axios.post(`/login`, {
                    email,
                    password,
                });
                if (data?.error) {
                    if (data.error === "Email Verfication Needed") {
                        setIsModalOpen(true);
                    } else {
                        toast.error(data.error);
                    }
                } else {
                    localStorage.setItem("auth", JSON.stringify(data));
                    setAuth({ ...auth, token: data.token, user: data.user });
                    toast.success(`Welcome back! ${data?.user?.firstName} 👋`);
                    navigate(
                        location.state ||
                            `/dashboard/${
                                data?.user?.role === 1 ? "admin" : "user"
                            }`
                    );
                }
            } catch (err) {
                toast.error("Login failed. \nPlease try again.");
                console.log(err);
            }
        }
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        // This URL must be changed on production!
        window.location.href = `http://localhost:8000/auth/google`;
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <ul className="loginForm d-flex flex-column justify-content-between">
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
                        <h3>
                            <Link
                                to="/forgotpassword"
                                style={{
                                    color: "#7b1fa2",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </h3>
                    </li>
                    <li>
                        <button className="btn btn-primary" type="submit">
                            Log in
                        </button>
                    </li>
                    <li>
                        <h6>
                            <span>—</span> Or, Sign up with Google{" "}
                            <span>—</span>
                        </h6>
                    </li>
                    {/* {profile ? (
                        <div>
                            <img src={profile.picture} alt="user" />
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
                            <br />
                            <br />
                            <button onClick={logOut}>Log out</button>
                        </div>
                    ) : ( */}
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
                    {/* )} */}
                    <li>
                        <h4>
                            Don't have an account?{" "}
                            <span>
                                <Link
                                    to="/register"
                                    style={{ color: "#7b1fa2" }}
                                >
                                    Create an account
                                </Link>
                            </span>
                        </h4>
                    </li>
                </ul>
            </form>
            {/* Modal for Unverified User : Email Verication Sent */}
            <ModalInfo
                color={"#30a14e"}
                isModalOpen={isModalOpen}
                handleOk={() => setIsModalOpen(false)}
                handleCancel={() => setIsModalOpen(false)}
                okBtnText={"Got it"}
                text={`Verification email sent to ${email}`}
                width={350}
            />
        </>
    );
}
