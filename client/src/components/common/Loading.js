import loadingGIF from "../../assets/images/Common/loading.gif";

export default function Loading() {
    return (
        <div
            className="d-flex justify-content-center"
            style={{ margin: "200px 0" }}
        >
            <img
                src={loadingGIF}
                alt="Loading"
                style={{
                    width: "50px",
                    height: "50px",
                }}
            />
        </div>
    );
}
