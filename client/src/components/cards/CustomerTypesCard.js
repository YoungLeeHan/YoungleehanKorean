// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------

import { useState } from "react";
import { Link } from "react-router-dom";
import {
    mobileWidth,
    colorPurple,
    colorGray,
    bgColorBeige,
} from "../../constants/constant";
import useWindowWidth from "./../../hooks/useWindowWidth";

export default function CustomerTypesCard({ data }) {
    //hooks
    const windowWidth = useWindowWidth();

    //state
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            {windowWidth > mobileWidth && (
                <div
                    style={{
                        height: "320px",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                    className={`card-box scrollbarDesign d-flex flex-column ${
                        isHovered
                            ? "justify-content-between align-items-start"
                            : "justify-content-center align-items-center"
                    }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {!isHovered && (
                        <div className="text-center">
                            <img
                                style={{ width: "70px", height: "70px" }}
                                src={data?.image}
                                alt={`${data?.name} Icon`}
                            />
                            <h3>{data?.name}</h3>
                        </div>
                    )}
                    {isHovered && (
                        <div
                            className="text-start d-flex flex-column justify-content-between align-items-start"
                            style={{ height: "100%" }}
                        >
                            <h4>"{data?.msg}"</h4>
                            <p>{data?.subMsg}</p>
                            <Link to={data?.link}>
                                <button className="btn btn-outline-primary">
                                    View Story
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {windowWidth < mobileWidth && !isHovered && (
                <div
                    className="d-flex flex-column justify-content-between align-items-center text-center"
                    style={{
                        height: "280px",
                        borderRadius: "10px",
                        padding: "20px",
                        backgroundColor: bgColorBeige,
                    }}
                >
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <img
                            style={{ width: "30px", height: "30px" }}
                            src={data?.image}
                            alt={`${data?.name} Icon`}
                        />
                        <h3
                            style={{
                                color: colorPurple,
                                fontWeight: "600",
                                marginLeft: "10px",
                            }}
                        >
                            {data?.name}
                        </h3>
                    </div>
                    <h4 style={{ fontSize: "16px" }}>"{data?.msg}"</h4>
                    <p style={{ fontSize: "12px", color: colorGray }}>
                        {data?.subMsg}
                    </p>
                    <Link to={data?.link}>
                        <button
                            className="btn btn-primary"
                            style={{
                                fontSize: "14px",
                                borderRadius: "10px",
                                fontWeight: "400",
                                padding: "10px 20px",
                                backgroundColor: colorPurple,
                            }}
                        >
                            View Story
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
}
