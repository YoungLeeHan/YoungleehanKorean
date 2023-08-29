// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import { Rate } from "antd";
import { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";

export default function StudentReviewCard({ data }) {
    //hooks
    const windowWidth = useWindowWidth();

    //states
    const [isEven, setIsEven] = useState(false);

    useEffect(() => {
        if (data._id % 2 === 0) setIsEven(true);
    }, []);

    return (
        <>
            <div
                className="review-card scrollbarDesign d-flex flex-column justify-content-between align-items-center"
                style={{
                    backgroundColor: "#FFFEFB",
                    borderRadius: "10px",
                    boxShadow:
                        windowWidth < mobileWidth
                            ? ""
                            : "0px 4px 50px 0px rgba(212, 207, 207, 0.20)",
                    padding: "28px",
                    height: "350px",
                    marginTop: windowWidth < mobileWidth ? "10px" : "",
                    overflowY: "auto",
                    transform:
                        isEven && windowWidth > mobileWidth
                            ? ""
                            : "translateY(-25px)",
                }}
            >
                <img
                    src={data.image}
                    alt={data.name}
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
                <h3
                    style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        lineHeight: "160%",
                        marginTop: "10px",
                    }}
                >
                    {data.name}
                </h3>
                <p
                    style={{
                        color: "#706866",
                        fontSize: "14px",
                        lineHeight: "165%",
                        margin: "18px 0 ",
                        textAlign: "center",
                    }}
                >
                    {data.msg}
                </p>

                <Rate disabled defaultValue={5} />
            </div>
        </>
    );
}
