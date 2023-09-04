import {
    mobileWidth,
    colorPurple,
    colorYellow,
    colorGray,
} from "../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function TitleCard({
    sectionTitle,
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
            style={{
                paddingTop: sectionTitle ? "120px" : "80px",
                textAlign: "center",
            }}
        >
            {sectionTitle && (
                <div
                    style={{
                        padding: "2px",
                        borderBottom: `3px solid ${colorYellow}`,
                        marginBottom: "12px",
                    }}
                >
                    <h3
                        style={{
                            fontWeight: "500",
                            fontSize:
                                windowWidth < mobileWidth ? "18px" : "20px",
                            borderBottom: `3px solid ${colorYellow}`,
                        }}
                    >
                        #{sectionTitle}
                    </h3>
                </div>
            )}
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
                        color: colorPurple,
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
                    color: colorGray,
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
