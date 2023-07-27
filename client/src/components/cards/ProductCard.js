// 👻 Developed by DanBi Choi on July 26th, 2023.
// -----------------------------------------------------

import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { AiFillStar } from "react-icons/ai";

export default function ProductCard() {
    return (
        <div className="card-container">
            <div className="img">
                <Link to={"/"}>
                    <img
                        src="https://images.perthnow.com.au/publication/C-7312600/47e615abf005f1882ddb12a2bf86ab8c7a696670-16x9-x0y456w7360h4140.jpg?imwidth=668&impolicy=pn_v3"
                        alt="cat"
                    />{" "}
                </Link>
            </div>
            <div className="text d-flex flex-column justify-content-between align-items-between">
                <Link to={"/"}>
                    <h3>Korean Alphabet Book</h3>
                    <h5>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting
                    </h5>
                </Link>

                <div className="text-bottom d-flex flex-row justify-content-between">
                    <h4>$95</h4>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="product-rate-box d-flex flex-row justify-content-between align-items-center">
                            <h6>4.7</h6>
                            <h6>
                                <AiFillStar style={{ fill: "#ffbf35" }} />
                            </h6>
                            <h6>(#)</h6>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                console.log("Add to Cart button clicked");
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
