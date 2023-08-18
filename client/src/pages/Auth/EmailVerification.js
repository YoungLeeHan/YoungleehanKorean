import Jumbotron from "../../components/cards/Jumbotron";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import axios from "axios";

export default function EmailVerification() {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const { data } = await axios.get(
          `/${params.id}/verify/${params.token}`
        );
        console.log("front", data);
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
      <Jumbotron
        title={"Verify email address"}
        directory={"Verify email address"}
      />
      <div
        style={{ maxWidth: "1170px" }}
        className="container-fluid d-flex flex-column align-items-center"
      >
        {validUrl ? (
          <div className="d-flex flex-column justify-content-between">
            <h3> Email verified successfully. </h3>
            <Link to="/login" style={{ color: "#7b1fa2" }}>
              <button className="btn btn-primary mb-10" type="Log in">
                Log in
              </button>
            </Link>
          </div>
        ) : (
          <PageNotFound />
        )}
      </div>
    </>
  );
}
