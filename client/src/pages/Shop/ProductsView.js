// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import ScrollToTop from "../../components/nav/ScrollToTop";
import "../../styles/pages/ProductsView.scss";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Checkbox, ConfigProvider, Slider } from "antd";
import { Rating } from "semantic-ui-react";
import ProductCard from "../../components/cards/ProductCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function ProductsView() {
    ScrollToTop();

    // states
    const [isFilterOn, setIsFilterOn] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [priceRange, setPriceRange] = useState([0, 30]);
    const [sortBy, setSortBy] = useState("");

    // hooks
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth < 767) {
            setIsFilterOn(false);
        } else {
            setIsFilterOn(true);
        }
    }, [windowWidth]);

    const handleShowFilter = (e) => {
        e.preventDefault();
        setIsFilterOn((curr) => !curr);
    };

    const handleSearchProduct = (e) => {
        e.preventDefault();
        console.log(`searching for ${searchKeyword}`);
    };

    // Student level filter
    const handleLevelFilterChange = (checkedValues) => {
        console.log(checkedValues);
    };

    // Student age filter
    const handleAgeFilterChange = (checkedValues) => {
        console.log(checkedValues);
    };

    // Price range filter
    const handlePriceRangeChange = (checked) => {
        console.log(checked);
        setPriceRange(checked);
    };

    // Rating filter
    const handleRatingFilterChange = (checkedValues) => {
        console.log(checkedValues);
    };

    // Sorting
    useEffect(() => {
        console.log(sortBy);
    }, [sortBy]);

    return (
        <>
            <Jumbotron title={"Korean Learning Materials"} directory={"Shop"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="shop-productsView-box container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            {/* 👉 Filter #1: Product Search starts here*/}
                            <form onSubmit={handleSearchProduct}>
                                <button type="submit" className="search-btn">
                                    <BsSearch />
                                </button>
                                <input
                                    type="search"
                                    value={searchKeyword}
                                    placeholder="Search"
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                ></input>
                            </form>
                            {/* Filter #1: Product Search ends here*/}
                            {/* 👉 Mobile responsive show/hide filter button starts here */}
                            {windowWidth < 767 && (
                                <button
                                    className="show-filter-btn"
                                    onClick={handleShowFilter}
                                >
                                    {isFilterOn ? (
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
                            )}
                            {/* Mobile responsive show/hide filter button ends here */}

                            {isFilterOn && (
                                <>
                                    {/* 👉 Ant Design UI style setting change starts here*/}
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorPrimary: "#7b1fa2",
                                                lineHeight: "2",
                                                colorPrimaryBorder: "#7b1fa2",
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
                                                defaultValue={[
                                                    "Hangul",
                                                    "Beginner",
                                                    "Intermediate",
                                                    "Advanced",
                                                ]}
                                                onChange={
                                                    handleLevelFilterChange
                                                }
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <div className="checkbox">
                                                            <Checkbox
                                                                value={"Hangul"}
                                                            >
                                                                Hangul 한글
                                                            </Checkbox>
                                                        </div>
                                                    </Col>
                                                    {[
                                                        "Beginner",
                                                        "Intermediate",
                                                        "Advanced",
                                                    ].map((item, i) => (
                                                        <Col span={24} key={i}>
                                                            <div className="checkbox">
                                                                <Checkbox
                                                                    value={item}
                                                                >
                                                                    {item}
                                                                </Checkbox>
                                                            </div>
                                                        </Col>
                                                    ))}
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
                                                defaultValue={[
                                                    "kids",
                                                    "adults",
                                                ]}
                                                onChange={handleAgeFilterChange}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <div className="checkbox">
                                                            <Checkbox value="kids">
                                                                Kids
                                                            </Checkbox>
                                                        </div>
                                                    </Col>
                                                    <Col span={24}>
                                                        <div className="checkbox">
                                                            <Checkbox value="adults">
                                                                Adults
                                                            </Checkbox>
                                                        </div>
                                                    </Col>
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
                                                Price: ${priceRange[0]} - $
                                                {priceRange[1]}
                                            </h5>
                                        </div>
                                        {/* Filter #4: filter by price ends here*/}
                                        {/* 👉 Filter #5: filter by rating starts here*/}
                                        <div className="filter-box">
                                            <h2>Ratings</h2>
                                            <Checkbox.Group
                                                style={{
                                                    width: "100%",
                                                }}
                                                defaultValue={[
                                                    "5",
                                                    "4",
                                                    "3",
                                                    "2",
                                                    "1",
                                                ]}
                                                onChange={
                                                    handleRatingFilterChange
                                                }
                                            >
                                                <Row>
                                                    {[
                                                        "5",
                                                        "4",
                                                        "3",
                                                        "2",
                                                        "1",
                                                    ].map((star, i) => (
                                                        <Col span={24} key={i}>
                                                            <div className="checkbox2">
                                                                <Checkbox
                                                                    value={star}
                                                                >
                                                                    <Rating
                                                                        defaultRating={
                                                                            star
                                                                        }
                                                                        maxRating={
                                                                            5
                                                                        }
                                                                        disabled
                                                                    />
                                                                </Checkbox>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Checkbox.Group>
                                        </div>
                                        {/* Filter #5: filter by rating ends here*/}
                                    </ConfigProvider>
                                </>
                            )}
                        </div>
                        <div className="col-md-9">
                            <div className="sortBy-box d-flex flex-row justify-content-between align-items-center">
                                <h5>3 items available</h5>
                                <div className="dropdown">
                                    <li>
                                        <a
                                            className="dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            <span
                                                style={{
                                                    padding: "0 20px 0 39px",
                                                    color: "#706866",
                                                }}
                                            >
                                                Sort by
                                            </span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {[
                                                "Most recent",
                                                "Popularity",
                                                "Alphabetical",
                                            ].map((item, i) => (
                                                <li key={i}>
                                                    <button
                                                        onClick={(e) => {
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
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
