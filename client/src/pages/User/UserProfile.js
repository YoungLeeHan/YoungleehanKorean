import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserProfile() {
    const [auth, setAuth] = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (auth?.user) {
            const { firstName, LastName, email, address } = auth.user;
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setAddress(address);
        }
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/profile", {
                firstName,
                lastName,
                password,
                address,
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
                toast.success("Profile updated");
            }
        } catch (err) {
            console.log(err);
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
                style={{ maxWidth: "1170px", minHeight: "500px" }}
                className="container-fluid"
            >
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <UserMenu id={1} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control m-2 p-2"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                autoFocus={true}
                            />

                            <input
                                type="text"
                                className="form-control m-2 p-2"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                autoFocus={true}
                            />

                            <input
                                type="email"
                                className="form-control m-2 p-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={true}
                            />

                            <input
                                type="password"
                                className="form-control m-2 p-2"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <textarea
                                className="form-control m-2 p-2"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <button className="btn btn-primary m-2 p-2">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
