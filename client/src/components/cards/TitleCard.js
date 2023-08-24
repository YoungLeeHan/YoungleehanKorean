import yellowLinesSVG from "../../assets/images/Home/yellowLines.svg";
import { mobileWidth } from "../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function TitleCard({
    sectionTitle,
    barWidth = 145,
    mainTitle1,
    mainTitle2,
    mainTitle3,
    subParagraph,
}) {
    //hooks
    const windowWidth = useWindowWidth();

    return (
        <div
            className={"d-flex flex-column align-items-center"}
            style={{ paddingTop: "120px", textAlign: "center" }}
        >
            <h3
                style={{
                    fontWeight: "500",
                    fontSize: windowWidth < mobileWidth ? "18px" : "20px",
                    marginBottom: "0",
                }}
            >
                #{sectionTitle}
            </h3>
            <img
                src={yellowLinesSVG}
                alt="highlight"
                style={{
                    transform: "translateY(-7px)",
                    width: `${barWidth}`,
                    height: "16px",
                }}
            />
            <h1
                style={{
                    fontWeight: "600",
                    fontSize: windowWidth < mobileWidth ? "28px" : "32px",
                    marginBottom: "10px",
                }}
            >
                {mainTitle1}{" "}
                <span
                    style={{
                        color: "#7b1fa2",
                        fontWeight: "600",
                        fontSize: windowWidth < mobileWidth ? "28px" : "32px",
                        marginBottom: "10px",
                    }}
                >
                    {mainTitle2}
                </span>{" "}
                {mainTitle3}
            </h1>
            <p
                style={{
                    color: "#706866",
                    fontSize: windowWidth < mobileWidth ? "14px" : "16px",
                    margin: "10px 0 40px 0",
                    lineHeight: "160%",
                    maxWidth: "620px",
                }}
            >
                {subParagraph}
            </p>
        </div>
    );
}
