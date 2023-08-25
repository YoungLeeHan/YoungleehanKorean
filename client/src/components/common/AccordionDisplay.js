// 👻 Developed by DanBi Choi on Aug 23rd, 2023.
// -----------------------------------------------------
import { Collapse } from "antd";
import { FaPlus, FaMinus } from "react-icons/fa";
import { worksheetTextData } from "../../constants/constant";
import { mobileWidth } from "../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useState } from "react";

const getItems = (panelStyle, windowWidth) => {
    let data = [];
    for (let d of worksheetTextData) {
        let obj = {
            key: d._id,
            label: (
                <h5
                    style={{
                        fontSize: windowWidth < mobileWidth ? "14px" : "16px",
                        fontWeight: "600",
                    }}
                >
                    {d._id}.&nbsp;&nbsp;&nbsp;{d.title}
                </h5>
            ),
            children: (
                <p
                    style={{
                        paddingLeft: "20px",
                        color: "#706866",
                        fontSize: windowWidth < mobileWidth ? "13px" : "15px",
                        lineHeight: "160%",
                    }}
                >
                    {d.description}
                </p>
            ),
            style: panelStyle,
        };
        data.push(obj);
    }
    return data;
};

export default function AccordionDisplay() {
    //hooks
    const windowWidth = useWindowWidth();

    //states
    const [activeKey, setActiveKey] = useState(["1"]);

    // Ensure that there's always at least one panel open
    const handlePanelChange = (keys) => {
        if (keys.length === 0) {
            setActiveKey(["1"]);
        } else {
            setActiveKey(keys);
        }
    };

    const panelStyle = {
        padding: "5px 20px",
        marginBottom: 5,
        background: "#F4F5F6",
        borderRadius: "10px",
        border: "none",
        fontSize: "16",
    };

    return (
        <>
            <Collapse
                accordion
                items={getItems(panelStyle, windowWidth)}
                bordered={false}
                activeKey={activeKey}
                onChange={handlePanelChange}
                expandIconPosition={"end"}
                style={{
                    background: "#fcfcfc",
                    height: "300px",
                }}
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <FaMinus fill="#706866" />
                    ) : (
                        <FaPlus fill="#706866" />
                    )
                }
            />
        </>
    );
}
