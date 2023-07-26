import { Link } from "react-router-dom";
import "../../styles/components/cards/ProductCard.scss";
import { BsFillStarFill } from "react-icons/bs";

export default function ProductCard() {
    return (
        <div className="card-container">
            <Link to={"/"}>
                <article className="product-card">
                    <img
                        src="https://static5.depositphotos.com/1001951/531/i/950/depositphotos_5310772-stock-photo-funny-kitten.jpg"
                        alt="cat"
                    />
                    <div className="text">
                        <h3>title</h3>
                        <h5>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting
                        </h5>
                        <div className="d-flex flex-row justify-content-between">
                            <h4>$95</h4>
                            <h6>4.7</h6>
                            <BsFillStarFill color="red" />
                            <button className="btn btn-primary">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
}
