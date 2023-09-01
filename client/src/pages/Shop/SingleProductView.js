import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import ImageGallery from "../../components/products/ImageGallery";
import ProductReviews from "../../components/products/ProductReviews";
import Loading from "./../../components/routes/Loading";

const getProduct = (id) => axios.get(`/product/${id}`);

const DescriptionTabLabel = "Description";
const ReviewsTabLabel = "Reviews";
const Tabs = [DescriptionTabLabel, ReviewsTabLabel];
export default function SingleProductView() {
    useScrollToTop();

    // state
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentTab, setCurrentTab] = useState(DescriptionTabLabel);

    // hooks
    const params = useParams();

    // Load product information from DB
    useEffect(() => {
        if (!params.slug || params.slug === "") {
            return;
        }
        setIsLoading(true);
        getProduct(params.slug)
            .then(({ data }) => setProduct(data))
            .catch((err) => {
                setIsError(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
                setIsError(false);
            });
    }, [params.slug]);

    // // Load image of a product from DB
    // useEffect(() => {
    //     if (product) {
    //         loadImage();
    //     }
    // }, [product]);

    // const loadImage = async () => {
    //     try {
    //         const { data } = await axios.get(`/product/images/${product?._id}`);
    //         setProductImg(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <>
            <Jumbotron
                title={"Korean Learning Materials"}
                directory={"Shop"}
                subDirectory={product?.title}
            />
            <div
                style={{ maxWidth: "1170px", minHeight: "550px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                {isLoading && (
                    <div className="d-flex justify-content-center mt-5">
                        <Loading />
                    </div>
                )}
                {isError && (
                    <div className="d-flex justify-content-center mt-5">
                        Error!
                    </div>
                )}
                {product && (
                    <div
                        className="d-flex w-100"
                        style={{ marginTop: "100px" }}
                    >
                        <div className="d-flex flex-column flex-grow-1 me-5">
                            <ImageGallery
                                imageUrls={product?.imagePath}
                                name={product?.name}
                            />
                            {/*  TODO: implement Tab Component instead of div*/}
                            <div className="d-flex flex-row bg-light">
                                {Tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`btn ${
                                            currentTab === tab ? "active" : ""
                                        }`}
                                        style={{
                                            padding: "14px 30px",
                                            backgroundColor:
                                                currentTab === tab
                                                    ? "#7B1FA2"
                                                    : "",
                                            color:
                                                currentTab === tab
                                                    ? "white"
                                                    : "",
                                            border: "none",
                                            borderRadius: "0",
                                        }}
                                        onClick={() => setCurrentTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            {currentTab === DescriptionTabLabel && (
                                // TODO: Descripton Tab
                                <div className="d-flex flex-column"></div>
                            )}
                            {currentTab === ReviewsTabLabel && (
                                <ProductReviews id={params.slug} />
                            )}
                        </div>
                        <div
                            className={"d-flex flex-column"}
                            style={{ width: "440px" }}
                        >
                            <h1>{product?.title}</h1>
                            {/*  TODO: place for right tab*/}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
