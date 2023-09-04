// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------
import "../styles/pages/Contact.scss";
import Jumbotron from "../components/cards/Jumbotron";
import useScrollToTop from "../hooks/useScrollToTop";
import { useForm, ValidationError } from "@formspree/react";
import { Link } from "react-router-dom";
import { colorPurple, maxWidth } from "../constants/constant";

export default function Contact() {
    useScrollToTop();

    // Formspree state
    const [state, handleSubmit] = useForm("myyqzdbq");
    if (state.succeeded) {
        return (
            <div
                style={{
                    marginTop: "200px",
                    marginBottom: "200px",
                    textAlign: "center",
                    fontSize: "20px",
                }}
            >
                <p>
                    Thanks for your email. <br />
                    We will get back to you shortly!
                </p>
                <Link
                    to={"/"}
                    className="pointer"
                    style={{
                        color: colorPurple,
                        textDecoration: "underline",
                        fontSize: "16px",
                    }}
                >
                    Go Home ⇀
                </Link>
            </div>
        );
    }

    return (
        <>
            <Jumbotron title={"Contact"} directory={"Contact  "} />
            <div
                style={{ maxWidth: maxWidth }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="contact-box container-fluid">
                    <h3>Send Us Message</h3>
                    {/* Formspree Embedding Code starts here */}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    required
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                />
                            </div>
                        </div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                        />
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Write Your Message"
                            required
                        />
                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="btn btn-primary"
                        >
                            Send
                        </button>
                    </form>
                    {/* Formspree Embedding Code ends here */}
                </div>
            </div>
        </>
    );
}
