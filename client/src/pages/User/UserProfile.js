// 👻 Developed by DanBi Choi on Aug 16th, 2023.
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
import ProfileDropDownInput from "../../components/cards/ProfileDropDownInput";
import {
    countryList,
    usStatesList,
    mobileWidth,
} from "../../constants/constant";
import loadingGIF from "../../assets/images/Common/loading.gif";
import ModalInfo from "../../components/common/ModalInfo";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function UserProfile() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    useScrollToTop();

    // states
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    // redirect anonymous user
    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        } else {
            loadUserProfile();
        }
    }, []);

    const loadUserProfile = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/userInfo`);
            if (data?.error) {
                console.log(data.error);
            } else {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setCountry(data.country);
                setAddress1(data.address1);
                setAddress2(data.address2);
                setCity(data.city);
                setState(data.state);
                setZipcode(data.zipcode);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Please try again.");
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || password.length < 6) {
            setIsModalOpen(true);
        } else {
            try {
                const { data } = await axios.put("/profileUpdate", {
                    firstName,
                    lastName,
                    password,
                    country,
                    address1,
                    address2,
                    city,
                    state,
                    zipcode,
                });

                if (data?.error) {
                    toast.error(data.error);
                } else {
                    setAuth({ ...auth, user: data });
                    // local storage update
                    let ls = localStorage.getItem("auth");
                    ls = JSON.parse(ls);
                    ls.user = data;
                    localStorage.setItem("auth", JSON.stringify(ls));
                    setPassword("");
                    toast.success("Profile updated successfully!");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleInput = (label, value) => {
        switch (label) {
            case "First Name":
                return setFirstName(value);
            case "Last Name":
                return setLastName(value);
            case "Password":
                return setPassword(value);
            case "Country":
                return setCountry(value);
            case "Address 1":
                return setAddress1(value);
            case "Address 2":
                return setAddress2(value);
            case "City":
                return setCity(value);
            case "State":
                return setState(value);
            case "Zip code":
                return setZipcode(value);
            default:
                return;
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello, ${auth?.user?.firstName}!`}
                directory={"Dashboard"}
                subDirectory={"Profile"}
            />
            <div
                style={{ maxWidth: "1170px", minHeight: "400px" }}
                className="container-fluid"
            >
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={1} />
                    </div>
                    <div className="col-md-9">
                        {isLoading && (
                            <div
                                className="d-flex justify-content-center"
                                style={{ margin: "200px 0" }}
                            >
                                <img
                                    src={loadingGIF}
                                    alt="Loading"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
                            </div>
                        )}
                        {!isLoading && (
                            <div
                                className="profile-box"
                                style={{
                                    marginTop:
                                        windowWidth < mobileWidth ? "15px" : "",
                                }}
                            >
                                <div className="profile-box-title d-flex flex-row justify-content-between align-items-center">
                                    <h1>My Profile</h1>
                                    <h5>
                                        <span>*</span> fields are required.
                                    </h5>
                                </div>
                                <ul className="profileForm d-flex flex-column justify-content-between">
                                    <li className="single">
                                        <ProfileInput
                                            label={"Email"}
                                            type={"email"}
                                            value={email}
                                            disabled={true}
                                        />
                                    </li>
                                    <li
                                        className={
                                            windowWidth > mobileWidth
                                                ? "double"
                                                : "single"
                                        }
                                    >
                                        <ProfileInput
                                            label={"First Name"}
                                            type={"text"}
                                            value={firstName}
                                            placeholder={"Your first name"}
                                            handleInput={handleInput}
                                        />

                                        <ProfileInput
                                            label={"Last Name"}
                                            type={"text"}
                                            value={lastName}
                                            placeholder={"Your last name"}
                                            handleInput={handleInput}
                                        />
                                    </li>
                                    <li className="single">
                                        <ProfileInput
                                            label={"Password"}
                                            type={"password"}
                                            value={password}
                                            placeholder={"Current password"}
                                            handleInput={handleInput}
                                            required={true}
                                        />
                                    </li>
                                    <li className="single">
                                        <ProfileDropDownInput
                                            label={"Country"}
                                            value={country}
                                            placeholder={"Select your country"}
                                            handleInput={handleInput}
                                            data={countryList}
                                        />
                                    </li>
                                    {country === "United States" && (
                                        <>
                                            <li
                                                className={
                                                    windowWidth > mobileWidth
                                                        ? "double"
                                                        : "single"
                                                }
                                            >
                                                <ProfileInput
                                                    label={"Address 1"}
                                                    type={"text"}
                                                    value={address1}
                                                    placeholder={"Your address"}
                                                    handleInput={handleInput}
                                                />
                                                <ProfileInput
                                                    label={"Address 2"}
                                                    type={"text"}
                                                    value={address2}
                                                    placeholder={"(Optional)"}
                                                    handleInput={handleInput}
                                                />
                                            </li>
                                            <li
                                                className={
                                                    windowWidth > mobileWidth
                                                        ? "double"
                                                        : "single"
                                                }
                                            >
                                                <ProfileInput
                                                    label={"City"}
                                                    type={"text"}
                                                    value={city}
                                                    placeholder={"City"}
                                                    handleInput={handleInput}
                                                />
                                                <ProfileDropDownInput
                                                    label={"State"}
                                                    value={state}
                                                    placeholder={"State"}
                                                    handleInput={handleInput}
                                                    data={usStatesList}
                                                />
                                            </li>
                                            <li
                                                className={
                                                    windowWidth > mobileWidth
                                                        ? "double"
                                                        : "single"
                                                }
                                            >
                                                <ProfileInput
                                                    label={"Zip code"}
                                                    type={"text"}
                                                    value={zipcode}
                                                    placeholder={"Zip code"}
                                                    handleInput={handleInput}
                                                    maxlength={5}
                                                />
                                            </li>
                                        </>
                                    )}
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            margin: "10px 0",
                                            borderRadius: "10px",
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Update Profile
                                    </button>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalInfo
                isModalOpen={isModalOpen}
                handleOk={() => setIsModalOpen(false)}
                handleCancel={() => setIsModalOpen(false)}
                okBtnText={"Ok"}
                width={450}
                text={"Make sure to type in your current password."}
            />
        </>
    );
}
