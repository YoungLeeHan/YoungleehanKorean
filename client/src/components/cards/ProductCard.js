import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { AiFillStar } from "react-icons/ai";

export default function ProductCard() {
    return (
        <div className="card-container">
            <Link to={"/"}>
                <div className="img">
                    <img
                        src="https://static5.depositphotos.com/1001951/531/i/950/depositphotos_5310772-stock-photo-funny-kitten.jpg"
                        alt="cat"
                    />
                </div>
                <div className="text d-flex flex-column justify-content-between">
                    <h3>title</h3>
                    <h5>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting
                    </h5>
                    <div className="d-flex flex-row justify-content-between">
                        <h4>$95</h4>
                        <div className="flex-row">
                            <h6>4.7</h6>
                            <AiFillStar style={{ fill: "#ffbf35" }} />
                            <h6>(#)</h6>
                            <button className="btn btn-primary">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
