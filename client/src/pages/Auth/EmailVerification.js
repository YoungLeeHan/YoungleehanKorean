import Jumbotron from "../../components/cards/Jumbotron";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import axios from "axios";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";

export default function EmailVerification() {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const { data } = await axios.get(
                    `/${params.id}/verify/${params.token}`
                );
                setValidUrl(true);
            } catch (err) {
                console.log(err);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [params]);

    return (
        <>
            {validUrl ? (
                <>
                    <Jumbotron
                        title={"Verify email address"}
                        directory={"Email verification"}
                    />
                    <div
                        style={{ maxWidth: "1170px", minHeight: "400px" }}
                        className="container-fluid d-flex flex-column justify-content-center align-items-center"
                    >
                        <h3
                            style={{
                                fontSize:
                                    windowWidth < mobileWidth ? "14px" : "20px",
                            }}
                        >
                            Thank you for verifying your email!
                        </h3>
                        <Link
                            to="/login"
                            style={{ color: "#7b1fa2", marginTop: "30px" }}
                        >
                            <button
                                className="btn btn-primary"
                                style={{
                                    borderRadius: "10px",
                                    fontSize:
                                        windowWidth < mobileWidth
                                            ? "14px"
                                            : "16px",
                                }}
                            >
                                Log in
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <PageNotFound />
            )}
        </>
    );
}
