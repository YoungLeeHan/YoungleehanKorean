// 👻 Developed by DanBi Choi on Aug 27th, 2023.
// -----------------------------------------------------
import noOrderImg from "../../assets/images/UserProfile/noOrder.svg";
import { mobileWidth, colorPurple, colorGray } from "../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useNavigate } from "react-router-dom";

export default function NoOrderDisplay() {
    //hooks
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <img
                src={noOrderImg}
                alt="Curious women"
                style={{
                    width: windowWidth < mobileWidth ? "250px" : "350px",
                    marginTop: windowWidth < mobileWidth ? "20px" : "0",
                }}
            />
            <h1
                style={{
                    color: colorPurple,
                    fontSize: windowWidth < mobileWidth ? "20px" : "32px",
                    fontWeight: "600",
                    margin: "20px 0 20px 0",
                }}
            >
                No orders yet?
            </h1>
            <p
                style={{
                    color: colorGray,
                    fontSize: windowWidth < mobileWidth ? "14px" : "20px",
                    maxWidth: "505px",
                    marginBottom: "20px",
                }}
            >
                We're excited to see which worksheet you'll choose for your
                first step towards language mastery!
            </p>
            <button
                className="btn btn-primary"
                onClick={(e) => {
                    navigate("/shop");
                }}
            >
                Go to Shop
            </button>
        </div>
    );
}
