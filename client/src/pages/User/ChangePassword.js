// 👻 Developed by DanBi Choi on Aug 22th, 2023.
// -----------------------------------------------------
import "../../styles/pages/User/UserProfile.scss";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "./../../hooks/useWindowWidth";
import ProfileInput from "../../components/cards/ProfileInput";
import { mobileWidth, colorPurple, maxWidth } from "./../../constants/constant";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function ChangePassword() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    useScrollToTop();

    // states
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // redirect anonymous user
    useEffect(() => {
        if (!auth?.token) navigate("/login");
    }, []);

    const handleInput = (label, value) => {
        if (auth?.user._id === "64e7ee099ce707dadab29262") {
            toast.error("Test user cannot change password.");
        } else {
            switch (label) {
                case "Current Password":
                    return setCurrentPassword(value);
                case "New Password":
                    return setNewPassword(value);
                case "Confirm Password":
                    return setConfirmPassword(value);
                default:
                    return;
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Insert all required fields.");
        } else if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
        } else if (newPassword.length < 6) {
            toast.error("Password must be 6 characters long.");
        } else {
            try {
                const { data } = await axios.put("/passwordUpdate", {
                    currentPassword,
                    newPassword,
                });
                if (data?.error) {
                    toast.error(data.error);
                } else {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    toast.success(
                        "Your password has been updated successfully!"
                    );
                }
            } catch (err) {
                console.log(err);
                toast.error("Internal server error. Try again.");
            }
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello, ${auth?.user?.firstName}!`}
                directory={"Dashboard"}
                subDirectory={"Change password"}
            />
            <div
                style={{ maxWidth: maxWidth, minHeight: "400px" }}
                className="container-fluid"
            >
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={2} />
                    </div>
                    <div className="col-md-9">
                        <div
                            className="profile-box"
                            style={{
                                marginTop:
                                    windowWidth < mobileWidth ? "15px" : "",
                            }}
                        >
                            <div
                                className={`profile-box-title d-flex ${
                                    windowWidth < mobileWidth
                                        ? "flex-column align-items-start"
                                        : "flex-row align-items-center"
                                }  justify-content-between`}
                            >
                                <h1>Change Password</h1>
                                <h5
                                    style={
                                        windowWidth < mobileWidth
                                            ? { marginTop: "10px" }
                                            : {}
                                    }
                                >
                                    <span>*</span> fields are required.
                                </h5>
                            </div>
                            <ul className="profileForm d-flex flex-column justify-content-between">
                                <li className="single">
                                    <ProfileInput
                                        label={"Current Password"}
                                        type={"password"}
                                        value={currentPassword}
                                        placeholder={"Current password"}
                                        handleInput={handleInput}
                                        required={true}
                                    />
                                </li>
                                <li className="single">
                                    <ProfileInput
                                        label={"New Password"}
                                        type={"password"}
                                        value={newPassword}
                                        placeholder={"Insert new password"}
                                        handleInput={handleInput}
                                        required={true}
                                    />
                                </li>
                                <li className="single">
                                    <ProfileInput
                                        label={"Confirm Password"}
                                        type={"password"}
                                        value={confirmPassword}
                                        placeholder={"Confirm new password"}
                                        handleInput={handleInput}
                                        required={true}
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
                                            <li>• Minimum 6 characters</li>
                                            <li>
                                                • A uppercase and lowercase
                                                letter
                                            </li>
                                            <li>• A number</li>
                                            <li>• A special character</li>
                                        </ul>
                                    </h4>
                                </li>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        margin: "10px 0",
                                        borderRadius: "10px",
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Update Password
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
