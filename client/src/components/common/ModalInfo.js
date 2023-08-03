import { Modal, ConfigProvider } from "antd";
import { BsInfoCircleFill } from "react-icons/bs";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function ModalInfo({
    isModalOpen,
    handleOk,
    handleCancel,
    okBtnText,
    text,
}) {
    // hooks
    const windowWidth = useWindowWidth();

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#ffbf35",
                        lineHeight: "2",
                        colorPrimaryBorder: "#ffbf35",
                    },
                }}
            >
                <Modal
                    centered
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={400}
                    okText={okBtnText}
                >
                    <div
                        className="d-flex flex-row justify-content-center align-items-center"
                        style={{ padding: "40px 0 30px 0" }}
                    >
                        <BsInfoCircleFill
                            fill="#ffbf35"
                            size="25px"
                            style={{ marginRight: "10px" }}
                        />
                        <h3
                            style={
                                windowWidth > 500
                                    ? { fontSize: "18px" }
                                    : { fontSize: "14px" }
                            }
                        >
                            {text}
                        </h3>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
}
