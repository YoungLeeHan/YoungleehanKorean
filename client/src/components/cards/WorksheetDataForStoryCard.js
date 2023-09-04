// 👻 Developed by DanBi Choi on Aug 28th, 2023.
// -----------------------------------------------------
import { mobileWidth, colorGray } from "../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useState, useEffect } from "react";

export default function WorksheetDataForStoryCard({ data }) {
    //hooks
    const windowWidth = useWindowWidth();

    // state
    const [isEven, setIsEven] = useState(false);

    useEffect(() => {
        if (data._id % 2 === 0) setIsEven(true);
    }, [data._id]);

    return (
        <div className="row" style={{ marginBottom: "50px" }}>
            {windowWidth < mobileWidth || !isEven ? (
                <>
                    <div
                        className="col-md-6"
                        style={{
                            height: "170px",
                        }}
                    >
                        <img
                            src={data.image}
                            alt={data.title}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                    <div className="col-md-6 text-start">
                        <h3
                            style={{
                                fontSize:
                                    windowWidth < mobileWidth ? "16px" : "18px",
                                fontWeight: "600",
                                marginBottom: "20px",
                                marginTop:
                                    windowWidth < mobileWidth ? "30px" : "0",
                            }}
                        >
                            {data._id}. {data.title}
                        </h3>
                        <p
                            style={{
                                fontSize:
                                    windowWidth < mobileWidth ? "14px" : "16px",
                                color: colorGray,
                            }}
                        >
                            {data.msg}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-md-6 text-start">
                        <h3
                            style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                marginBottom: "20px",
                                marginTop:
                                    windowWidth < mobileWidth ? "30px" : "0",
                            }}
                        >
                            {data._id}. {data.title}
                        </h3>
                        <p
                            style={{
                                fontSize: "16px",
                                color: colorGray,
                            }}
                        >
                            {data.msg}
                        </p>
                    </div>
                    <div
                        className="col-md-6"
                        style={{
                            height: "170px",
                        }}
                    >
                        <img
                            src={data.image}
                            alt={data.title}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
