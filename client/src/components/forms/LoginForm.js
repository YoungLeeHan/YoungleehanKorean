// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------

import lockSVG from "../../assets/images/Login/lock.svg";
import envelopeSVG from "../../assets/images/Login/envelope.svg";
import "../../styles/components/cards/LoginForm.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    toast.error(data.error);
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

<<<<<<< HEAD
    // Google Login Feature
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Log in Failed:", error),
    });
    // Using User token, fetch user data from google api
    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setProfile(res.data);
                    toast.success(`Welcome back! ${res?.data?.name}👋`);
                    console.log(user);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong. Try again.");
                });
        }
    }, [user]);

    // Google Log Out Feature
    const logOut = () => {
        googleLogout();
        setProfile(null);
        toast.success("Bye 👋");
=======
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await axios.get("/auth");
        //     const googleClientId = response.data.googleClientId;

        //     console.log("google log in button clicked");

        //     const { data } = await axios.post(`/auth`, {
        //         email,
        //         password,
        //         googleClientId, // Google Client ID를 함께 보냄
        //     });

        //     if (data?.error) {
        //         toast.error(data.error);
        //     } else {
        //         localStorage.setItem("auth", JSON.stringify(data));
        //         setAuth({ ...auth, token: data.token, user: data.user });
        //         toast.success("Login successful");
        //         navigate(
        //             location.state ||
        //                 `/dashboard/${
        //                     data?.user?.role === 1 ? "admin" : "user"
        //                 }`
        //         );
        //     }
        // } catch (err) {
        //     toast.error("Login failed. \nPlease try again.");
        //     console.log(err);
        // }
>>>>>>> fdaf7aa (chore: just for pulling)
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
                    {profile ? (
                        <div>
                            <img src={profile.picture} alt="user" />
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
                            <br />
                            <br />
                            <button onClick={logOut}>Log out</button>
                        </div>
                    ) : (
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
                    )}
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
        </>
    );
}
