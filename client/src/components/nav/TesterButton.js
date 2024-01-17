// 👻 Developed by DanBi Choi on Jan 16th, 2024.
// -----------------------------------------------------
import yellowtagSVG from "../../assets/images/Common/yellowtag.svg";

export default function TesterButton({ setIsModalOpen }) {
    return (
        <div
            className="notice"
            onClick={() => setIsModalOpen(true)}
            style={{
                cursor: "pointer",
                transform: `translateX(150px)`,
                transition: "transform 1.5s ease-in-out",
            }}
        >
            <img src={yellowtagSVG} alt="User Notice" />
        </div>
    );
}
