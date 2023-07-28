// 👻 Developed by DanBi Choi on July 28th, 2023.
// -----------------------------------------------------

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ResponsiveShowFilter({ handleShowFilter, showFilter }) {
    return (
        <button className="show-filter-btn" onClick={handleShowFilter}>
            {showFilter ? (
                <>
                    <IoIosArrowUp
                        style={{
                            paddingBottom: "2px",
                            marginRight: "10px",
                        }}
                    />
                    Hide Filter
                </>
            ) : (
                <>
                    <IoIosArrowDown
                        style={{
                            paddingBottom: "2px",
                            marginRight: "10px",
                        }}
                    />
                    Show Filter
                </>
            )}
        </button>
    );
}
