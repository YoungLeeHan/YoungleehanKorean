// 👻 Developed by DanBi Choi on Aug 23rd, 2023.
// -----------------------------------------------------
import { Collapse } from "antd";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
    worksheetTextData,
    faqDataColumn1,
    faqDataColumn2,
    mobileWidth,
    colorGray,
    bgColorGray,
    bgColorWhite,
} from "../../constants/constant";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useState } from "react";

const getItems = (panelStyle, windowWidth, type) => {
    let originalData = [];
    if (type === "faq1") {
        originalData = faqDataColumn1;
    } else if (type === "faq2") {
        originalData = faqDataColumn2;
    } else if (type === "home") {
        originalData = worksheetTextData;
    }

    let data = [];
    for (let d of originalData) {
        let obj = {
            key: d._id,
            label: (
                <h5
                    style={{
                        fontSize: windowWidth < mobileWidth ? "14px" : "16px",
                        fontWeight: "600",
                    }}
                >
                    {type === "home" ? d._id + ". " + d.title : `${d.question}`}
                </h5>
            ),
            children: (
                <p
                    style={{
                        paddingLeft: "20px",
                        color: colorGray,
                        fontSize: windowWidth < mobileWidth ? "13px" : "15px",
                        lineHeight: "160%",
                    }}
                >
                    {type === "home" ? `${d.description}` : `${d.answer}`}
                </p>
            ),
            style: panelStyle,
        };
        data.push(obj);
    }
    return data;
};

export default function AccordionDisplay({ type }) {
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
        background: bgColorGray,
        borderRadius: "10px",
        border: "none",
        fontSize: "16",
    };

    return (
        <>
            <Collapse
                accordion
                items={getItems(panelStyle, windowWidth, type)}
                bordered={false}
                activeKey={activeKey}
                onChange={handlePanelChange}
                expandIconPosition={"end"}
                style={{
                    background: bgColorWhite,
                    height: "auto",
                }}
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <FaMinus fill={colorGray} />
                    ) : (
                        <FaPlus fill={colorGray} />
                    )
                }
            />
        </>
    );
}
