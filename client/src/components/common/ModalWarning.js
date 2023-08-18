// 👻 Developed by DanBi Choi on Aug 17th, 2023.
// -----------------------------------------------------

import { Modal, ConfigProvider } from "antd";
import { BsInfoCircleFill } from "react-icons/bs";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function ModalWarning({
    isModalOpen,
    handleOk,
    handleCancel,
    okBtnText,
    text,
    width = 400,
}) {
    // hooks
    const windowWidth = useWindowWidth();

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#9E1800",
                        lineHeight: "2",
                        colorPrimaryBorder: "#9E1800",
                    },
                }}
            >
                <Modal
                    centered
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={width}
                    okText={okBtnText}
                >
                    <div
                        className="d-flex flex-row justify-content-center align-items-center"
                        style={{ padding: "40px 0 30px 0" }}
                    >
                        <BsInfoCircleFill
                            fill="#9E1800"
                            size="25px"
                            style={{ marginRight: "10px" }}
                        />
                        <h3
                            style={
                                windowWidth > 500
                                    ? { fontSize: "16px" }
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
