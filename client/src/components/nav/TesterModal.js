// 👻 Developed by DanBi Choi on Jan 16th, 2024.
// -----------------------------------------------------

import { Modal, ConfigProvider } from "antd";
import { testerWelcomeText, colorYellow } from "../../constants/constant";
import useWindowWidth from "./../../hooks/useWindowWidth";

export default function TesterModal({ isModalOpen, setIsModalOpen }) {
    //hooks
    const windowWidth = useWindowWidth();

    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: colorYellow,
                    lineHeight: "2",
                    colorPrimaryBorder: colorYellow,
                },
            }}
        >
            <Modal
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={windowWidth > 600 ? 600 : "100vw"}
                okText="Ok"
            >
                <div
                    className="d-flex flex-column justify-content-between align-items-start"
                    style={{ padding: "40px 0 30px 0" }}
                >
                    <div
                        style={{
                            marginBottom: "20px",
                            fontSize: windowWidth > 500 ? "16px" : "14px",
                            lineHeight: "160%",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: testerWelcomeText,
                        }}
                    ></div>
                </div>
            </Modal>
        </ConfigProvider>
    );
}
