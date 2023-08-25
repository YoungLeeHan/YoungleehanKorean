// 👻 Developed by DanBi Choi on July 19th, 2023.
// -----------------------------------------------------

import { mobileWidth } from "./../../constants/constant";
import useWindowWidth from "./../../hooks/useWindowWidth";

export default function Jumbotron({
    title,
    directory = null,
    subDirectory = null,
}) {
    //hooks
    const windowWidth = useWindowWidth();

    const highlightedStyle = {
        color: "#ffbf35",
        fontSize: windowWidth < mobileWidth ? "14px" : "16px",
        fontWeight: "400",
    };
    const defaultStyle = {
        color: "#706866",
        fontSize: windowWidth < mobileWidth ? "14px" : "16px",
        fontWeight: "400",
    };

    return (
        <>
            <div style={{ width: "100vw", backgroundColor: "#f6f4ee" }}>
                <div
                    style={{
                        maxWidth: "1170px",
                        margin: "auto",
                        padding: "0 10px 0 10px",
                    }}
                >
                    <h1
                        style={{
                            fontWeight: "700",
                            fontSize:
                                windowWidth < mobileWidth ? "28px" : "32px",
                            padding: "43px 0 15px 0",
                        }}
                    >
                        {title}
                    </h1>
                    <h5
                        style={{
                            ...defaultStyle,
                            paddingBottom: "65px",
                        }}
                    >
                        {directory && (
                            <>
                                Home/{" "}
                                <span
                                    style={
                                        subDirectory
                                            ? defaultStyle
                                            : highlightedStyle
                                    }
                                >
                                    {directory}
                                </span>
                            </>
                        )}
                        {subDirectory && (
                            <>
                                /{" "}
                                <span style={highlightedStyle}>
                                    {subDirectory}
                                </span>
                            </>
                        )}
                    </h5>
                </div>
            </div>
        </>
    );
}
