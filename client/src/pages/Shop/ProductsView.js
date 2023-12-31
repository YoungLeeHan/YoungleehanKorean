// 👻 Developed by DanBi Choi on July 25th, 2023. (UI)
// 👻 Developed by DanBi Choi on July 28th, 2023. (Filter & Sorting Feature added)
// 👻 Developed by DanBi Choi on Aug 1st, 2023. (Search Feature added)
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import useWindowWidth from "../../hooks/useWindowWidth";
import "../../styles/pages/ProductsView.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Checkbox, ConfigProvider, Slider } from "antd";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import ResponsiveShowFilter from "../../components/common/ResponsiveShowFilter";
import { mobileWidth, colorPurple, colorGray } from "../../constants/constant";
import Loading from "../../components/common/Loading";
import SearchUI from "../../components/common/SearchUI";
import useLevelCategory from "../../hooks/useLevelCategory";
import useAgeCategory from "../../hooks/useAgeCategory";
import { maxWidth } from "../../constants/constant";

export default function ProductsView() {
    // hooks
    useScrollToTop();
    const windowWidth = useWindowWidth();
    const { levelCategories } = useLevelCategory();
    const { ageCategories } = useAgeCategory();

    // states
    const [products, setProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [level, setLevel] = useState();
    const [age, setAge] = useState();
    const [priceRange, setPriceRange] = useState();
    const [sortBy, setSortBy] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Show or hide 'show filter' button depending on screen size
    useEffect(() => {
        if (windowWidth < mobileWidth) {
            setShowFilter(false);
        } else {
            setShowFilter(true);
        }
    }, [windowWidth]);

    const handleShowFilter = (e) => {
        e.preventDefault();
        setShowFilter((curr) => !curr);
    };

    // On page load, fetch products list from DB
    useEffect(() => {
        if (!level && !age && !priceRange) {
            loadProducts();
        }
    }, []);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/products`);
            setProducts(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Load filtered products when any filter is activated
    useEffect(() => {
        if (level || age || priceRange) {
            loadFilteredProducts();
        }
    }, [level, age, priceRange]);

    const loadFilteredProducts = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`/filtered-products`, {
                level,
                age,
                priceRange,
            });
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    // Product Search
    useEffect(() => {
        if (searchKeyword) handleSearch();
    }, [searchKeyword]);

    const handleSearch = async () => {
        // if there is a search keyword, search database with that keyword
        if (searchKeyword) {
            try {
                const { data } = await axios.get(
                    `/products/search/${searchKeyword}`
                );
                setProducts(data);
            } catch (err) {
                console.log(err);
            }
        } else {
            // if keyword is/became empty, fetch all products from database
            loadProducts();
        }
    };

    // Student level filter
    const handleLevelFilterChange = (checkedValues) => {
        setLevel(checkedValues);
    };

    // Student age filter
    const handleAgeFilterChange = (checkedValues) => {
        setAge(checkedValues);
    };

    // Price range filter
    const handlePriceRangeChange = (checked) => {
        setPriceRange(checked);
    };

    // Sorting
    useEffect(() => {
        if (sortBy) {
            handleSorting();
        }
    }, [sortBy]);

    const handleSorting = () => {
        let sortedProducts;
        switch (sortBy) {
            case "Newest":
                sortedProducts = [...products].sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                break;
            case "Best Selling":
                sortedProducts = [...products]?.sort((a, b) => {
                    return b.numberSold - a.numberSold;
                });
                break;
            case "High Rating":
                sortedProducts = [...products]?.sort((a, b) => {
                    return b.reviewRate - a.reviewRate;
                });
                break;
            case "Price: low to high":
                sortedProducts = [...products]?.sort((a, b) => {
                    return a.price - b.price;
                });
                break;
            case "Price: high to low":
                sortedProducts = [...products]?.sort((a, b) => {
                    return b.price - a.price;
                });
                break;
            default:
                sortedProducts = [...products].sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                break;
        }
        setProducts(sortedProducts);
    };

    return (
        <>
            <Jumbotron title={"Korean Learning Materials"} directory={"Shop"} />
            <div
                style={{ maxWidth: maxWidth }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="shop-productsView-box container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            {/* 👉 Filter #1: Product Search starts here*/}
                            <SearchUI
                                handleSearch={handleSearch}
                                searchKeyword={searchKeyword}
                                setSearchKeyword={setSearchKeyword}
                            />
                            {/* Filter #1: Product Search ends here*/}

                            {/* 👉 Mobile responsive show/hide filter button starts here */}
                            {windowWidth < mobileWidth && (
                                <ResponsiveShowFilter
                                    handleShowFilter={handleShowFilter}
                                    showFilter={showFilter}
                                />
                            )}
                            {/* Mobile responsive show/hide filter button ends here */}

                            {showFilter && (
                                <>
                                    {/* 👉 Ant Design UI style setting change starts here*/}
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorPrimary: colorPurple,
                                                lineHeight: "2",
                                                colorPrimaryBorder: colorPurple,
                                            },
                                        }}
                                    >
                                        {/* Ant Design UI style setting change ends here*/}

                                        {/* 👉 Filter #2: filter by level starts here*/}
                                        <div className="filter-box">
                                            <h2>Levels</h2>
                                            <Checkbox.Group
                                                style={{
                                                    width: "100%",
                                                }}
                                                onChange={
                                                    handleLevelFilterChange
                                                }
                                            >
                                                <Row>
                                                    {levelCategories?.map(
                                                        (item) => (
                                                            <Col
                                                                span={24}
                                                                key={item._id}
                                                            >
                                                                <div className="checkbox">
                                                                    <Checkbox
                                                                        value={
                                                                            item._id
                                                                        }
                                                                    >
                                                                        {item.name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            item.name.slice(
                                                                                1
                                                                            )}
                                                                    </Checkbox>
                                                                </div>
                                                            </Col>
                                                        )
                                                    )}
                                                </Row>
                                            </Checkbox.Group>
                                        </div>
                                        {/* Filter #2: filter by level ends here*/}

                                        {/* 👉 Filter #3: filter by age starts here*/}
                                        <div className="filter-box">
                                            <h2>Age</h2>
                                            <Checkbox.Group
                                                style={{
                                                    width: "100%",
                                                }}
                                                onChange={handleAgeFilterChange}
                                            >
                                                <Row>
                                                    {ageCategories?.map(
                                                        (group) => (
                                                            <Col
                                                                span={24}
                                                                key={group._id}
                                                            >
                                                                <div className="checkbox">
                                                                    <Checkbox
                                                                        value={
                                                                            group._id
                                                                        }
                                                                    >
                                                                        {group.name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            group.name.slice(
                                                                                1
                                                                            )}
                                                                    </Checkbox>
                                                                </div>
                                                            </Col>
                                                        )
                                                    )}
                                                </Row>
                                            </Checkbox.Group>
                                        </div>
                                        {/* Filter #3: filter by age ends here*/}

                                        {/* 👉 Filter #4: filter by price starts here*/}
                                        <div
                                            className="filter-box"
                                            style={{ marginBottom: "50px" }}
                                        >
                                            <h2>Price Range</h2>
                                            <div className="custom-slider">
                                                <Slider
                                                    range
                                                    step={5}
                                                    max={30}
                                                    min={0}
                                                    defaultValue={[0, 30]}
                                                    marks={{
                                                        0: "$0",
                                                        30: "$30",
                                                    }}
                                                    onChange={
                                                        handlePriceRangeChange
                                                    }
                                                />
                                            </div>
                                            <h5>
                                                Price:{" "}
                                                {priceRange
                                                    ? `$${priceRange[0]} - $${priceRange[1]}`
                                                    : "Show All"}
                                            </h5>
                                        </div>
                                        {/* Filter #4: filter by price ends here*/}
                                    </ConfigProvider>
                                </>
                            )}
                        </div>
                        <div className="col-md-9">
                            <div className="sortBy-box d-flex flex-row justify-content-between align-items-center">
                                <h5>{products?.length} items available</h5>
                                <div className="dropdown">
                                    <li>
                                        <a
                                            className="dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            <span
                                                style={{
                                                    padding: "0 20px 0 39px",
                                                    color: colorGray,
                                                }}
                                            >
                                                Sort by
                                            </span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {[
                                                "Newest",
                                                "Best Selling",
                                                "High Rating",
                                                "Price: low to high",
                                                "Price: high to low",
                                            ].map((item, i) => (
                                                <li key={i}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSortBy(
                                                                e.target
                                                                    .innerHTML
                                                            );
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </div>
                            </div>
                            {isLoading && <Loading />}
                            {products?.length > 0 &&
                                !isLoading &&
                                products?.map((product) => (
                                    <div key={product._id}>
                                        <ProductCardHorizontal
                                            product={product}
                                        />
                                    </div>
                                ))}
                            {products?.length === 0 && !isLoading && (
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "200px 0",
                                    }}
                                >
                                    No matching product found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
