import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import axios from 'axios';
import Jumbotron from '../../components/cards/Jumbotron';
import useScrollToTop from '../../hooks/useScrollToTop';
import useAddToCart from '../../hooks/useAddToCart';
import ImageGallery from '../../components/products/ImageGallery';
import ProductReviews from '../../components/products/ProductReviews';
import Loading from './../../components/routes/Loading';
import {
    colorPurple,
    colorGray,
    maxWidth,
    bgColorWhite,
    colorYellow,
} from '../../constants/constant';

const getProduct = (id) => axios.get(`/product/${id}`);

const DescriptionTabLabel = 'Description';
const ReviewsTabLabel = 'Reviews';
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
    const addtoCart = useAddToCart();

    // Load product information from DB
    useEffect(() => {
        if (!params.slug || params.slug === '') {
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

    const handleAddToCart = (e) => {
        e.preventDefault();
        addtoCart(product);
    };

    return (
        <>
            <Jumbotron
                title={'Korean Learning Materials'}
                directory={'Shop'}
                subDirectory={product?.title}
            />
            <div
                style={{ maxWidth: maxWidth, minHeight: '550px' }}
                className='container-fluid d-flex flex-column align-items-center'
            >
                {isLoading && (
                    <div className='d-flex justify-content-center mt-5'>
                        <Loading />
                    </div>
                )}
                {isError && (
                    <div className='d-flex justify-content-center mt-5'>
                        Error!
                    </div>
                )}
                {product && (
                    <>
                        <div
                            className='row d-flex w-100'
                            style={{
                                marginTop: '100px',
                                marginBottom: '30px',
                            }}
                        >
                            <div className='col-md-6 d-flex flex-column flex-grow-1 me-5'>
                                <ImageGallery imagePath={product.imagePath} />
                            </div>
                            <div
                                className={'col-md-6 d-flex flex-column'}
                                style={{ maxWidth: '440px', gap: '15px' }}
                            >
                                <h2
                                    style={{
                                        fontSize: '12px',
                                        padding: '5px 10px',
                                        color: bgColorWhite,
                                        backgroundColor: colorYellow,
                                        borderRadius: '5px',
                                        fontWeight: 500,
                                        marginBottom: '5px',
                                        width: 'fit-content',
                                    }}
                                >
                                    {product.category?.name}
                                </h2>
                                <h1 style={{ fontSize: '24px' }}>
                                    {product.title}
                                </h1>

                                <h3
                                    style={{
                                        color: colorPurple,
                                        fontSize: '20px',
                                    }}
                                >
                                    ${product.price}
                                </h3>
                                <button
                                    className='btn btn-primary d-flex flex-row mt-3 justify-center'
                                    style={{
                                        width: '190px',
                                        gap: '1rem',
                                    }}
                                    onClick={handleAddToCart}
                                >
                                    <BsCart3 style={{ fontSize: '20px' }} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className='row d-flex flex-column w-100 mb-5'>
                            <div className='d-flex flex-row bg-light mt-1'>
                                {Tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`btn ${
                                            currentTab === tab ? 'active' : ''
                                        }`}
                                        style={{
                                            padding: '14px 30px',
                                            backgroundColor:
                                                currentTab === tab
                                                    ? colorPurple
                                                    : '',
                                            color:
                                                currentTab === tab
                                                    ? 'white'
                                                    : '',
                                            border: 'none',
                                            borderRadius: '0',
                                        }}
                                        onClick={() => setCurrentTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            {currentTab === DescriptionTabLabel && (
                                <div
                                    className='d-flex flex-column mt-4'
                                    style={{
                                        maxWidth: '700px',
                                        color: colorGray,
                                        lineHeight: '165%',
                                    }}
                                >
                                    {product.description}
                                </div>
                            )}
                            {currentTab === ReviewsTabLabel && (
                                <ProductReviews id={product._id} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
