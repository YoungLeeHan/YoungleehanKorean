import Jumbotron from "../../components/cards/Jumbotron";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import axios from "axios";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth, maxWidth, colorPurple } from "../../constants/constant";
import { toast } from "react-hot-toast";
import useScrollToTop from "../../hooks/useScrollToTop";
import Loading from "../../components/common/Loading";

export default function EmailVerification() {
    // states
    const [isLoading, setIsLoading] = useState(true);
    const [validUrl, setValidUrl] = useState(false);

    //hooks
    const params = useParams();
    const windowWidth = useWindowWidth();
    useScrollToTop();

    useEffect(() => {
        verifyEmailUrl();
    }, []);

    const verifyEmailUrl = async () => {
        try {
            const { data } = await axios.get(
                `/${params.id}/verify/${params.token}`
            );
            if (data?.error) {
                console.log(data.error);
                toast.error(data.error);
            } else {
                setValidUrl(true);
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            {validUrl && !isLoading ? (
                <>
                    <Jumbotron
                        title={"Verify email address"}
                        directory={"Email verification"}
                    />
                    <div
                        style={{ maxWidth: maxWidth, minHeight: "400px" }}
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
                            style={{ color: colorPurple, marginTop: "30px" }}
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
