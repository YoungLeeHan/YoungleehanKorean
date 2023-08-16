// 👻 Developed by DanBi Choi on Aug 15th, 2023.
// -----------------------------------------------------

export default function AboutBadge({ badgeType, text, numberText }) {
    return (
        <div className="badge-box d-flex flex-row justify-content-center align-items-center">
            <img src={badgeType} alt="purpleBadge" style={{ zIndex: "5" }} />
            <div
                className="white-box d-flex flex-row justify-content-between align-items-center"
                style={{
                    marginLeft: "-40px",
                    padding: "25px 25px 25px 45px",
                    width: "280px",
                    borderRadius: "10px",
                    backgroundColor: "#FFF",
                    boxShadow: "0px 5px 30px 0px rgba(227, 227, 227, 0.30)",
                }}
            >
                <h3
                    style={{
                        fontSize: "16px",
                        color: "#706866",
                    }}
                >
                    {text}
                </h3>
                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        marginLeft: "17px",
                    }}
                >
                    {numberText}
                </h1>
            </div>
        </div>
    );
}
