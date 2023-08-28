// 👻 Developed by DanBi Choi on Aug 28th, 2023.
// -----------------------------------------------------
import useWindowWidth from "../../hooks/useWindowWidth";
import { mobileWidth } from "../../constants/constant";
import { Rate } from "antd";

export default function StudentReviewForCreatorCard({ data }) {
    //hooks
    const windowWidth = useWindowWidth();

    return (
        <>
            <div
                className="d-flex flex-column justify-content-start align-items-center"
                style={{
                    backgroundColor: "#FFFEFB",
                    padding: "30px",
                    height: windowWidth < mobileWidth ? "500px" : "360px",
                    overflowY: "auto",
                }}
            >
                <h3
                    style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        lineHeight: "160%",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    {data.name}
                </h3>
                <Rate disabled defaultValue={5} />
                <p
                    style={{
                        color: "#706866",
                        fontSize: windowWidth < mobileWidth ? "12px" : "14px",
                        lineHeight: "165%",
                        margin: "18px 0 ",
                        textAlign: "center",
                    }}
                >
                    {data.msg}
                </p>
            </div>
        </>
    );
}
