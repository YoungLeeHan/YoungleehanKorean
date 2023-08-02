// 👻 Developed by DanBi Choi on Aug 1st, 2023.
// -----------------------------------------------------

import { TiDelete } from "react-icons/ti";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartProductCard({
    item,
    cartQuantity,
    handleDelete,
    handleQuantityChange,
}) {
    return (
        <tr>
            <td className="product-info">
                <Link to={`/shop/${item?.slug}`}>
                    <div className="img">
                        <img
                            src={`${process.env.REACT_APP_API}/product/images/${item._id}`}
                            alt={item?.title}
                        />
                    </div>
                    <h3>{item?.title}</h3>{" "}
                </Link>
            </td>

            <td>
                <h4>${item?.price}</h4>
            </td>
            <td className="td-quantity">
                <div className="control-box d-flex flex-row justify-content-end align-items-center">
                    <h4>{cartQuantity[item._id]}</h4>
                    <div className="arrow-box d-flex flex-column">
                        <button
                            className="arrow-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                handleQuantityChange("up", item._id);
                            }}
                        >
                            <BiSolidUpArrow size="10px" fill="#B4B1B1" />
                        </button>
                        <button
                            className="arrow-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                handleQuantityChange("down", item._id);
                            }}
                            disabled={cartQuantity[item._id] === 1}
                        >
                            <BiSolidDownArrow size="10px" fill="#B4B1B1" />
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <h4>
                    <span>
                        ${(item?.price * cartQuantity[item._id]).toFixed(2)}
                    </span>
                </h4>
            </td>
            <td>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        handleDelete(item._id);
                    }}
                >
                    <TiDelete fill="#ffbf35" size={20} />
                </button>
            </td>
        </tr>
    );
}
