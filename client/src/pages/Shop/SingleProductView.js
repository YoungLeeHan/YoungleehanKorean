import Jumbotron from "../../components/cards/Jumbotron";
import ScrollToTop from "../../components/nav/ScrollToTop";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SingleProductView() {
    ScrollToTop();

    // state
    const [product, setProduct] = useState();
    const [productImg, setProductImg] = useState();

    // hooks
    const params = useParams();

    // Load product information from DB
    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setProduct(data);
        } catch (err) {
            console.log(err);
        }
    };

    // Load image of a product from DB
    useEffect(() => {
        if (product) {
            loadImage();
        }
    }, [product]);

    const loadImage = async () => {
        try {
            const { data } = await axios.get(`/product/images/${product?._id}`);
            setProductImg(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron
                title={"Korean Learning Materials"}
                directory={"Shop"}
                subDirectory={product?.title}
            />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div style={{ margin: "100px" }}>
                    <h1>Product page for '{product?.title}'</h1>
                    <img
                        src={`${process.env.REACT_APP_API}/product/images/${product?._id}`}
                        alt={product?.name}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                </div>
            </div>
        </>
    );
}
