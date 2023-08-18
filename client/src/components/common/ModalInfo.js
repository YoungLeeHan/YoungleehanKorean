// 👻 Developed by DanBi Choi on Aug 9th, 2023.
// -----------------------------------------------------

import { Modal, ConfigProvider } from "antd";
import { BsInfoCircleFill } from "react-icons/bs";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function ModalInfo({
    color = "#ffbf35",
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
                        colorPrimary: color,
                        lineHeight: "2",
                        colorPrimaryBorder: color,
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
                            fill={color}
                            size="25px"
                            style={{ margin: "0 10px" }}
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
