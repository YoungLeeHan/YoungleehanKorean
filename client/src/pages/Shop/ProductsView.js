// 👻 Developed by DanBi Choi on July 25th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import ScrollToTop from "../../components/nav/ScrollToTop";
import "../../styles/pages/ProductsView.scss";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Checkbox, ConfigProvider, Slider, Rate } from "antd";
import ProductCard from "../../components/cards/ProductCard";

export default function ProductsView() {
    ScrollToTop();

    // state
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearchProduct = (e) => {
        e.preventDefault();
        console.log("search btn clicked");
    };

    // Student level filter
    const handleLevelFilterChange = (checkedValues) => {
        console.log(checkedValues);
    };

    // Price range filter
    const handlePriceRangeChange = (checked) => {
        console.log(checked);
    };
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
                            <form onSubmit={handleSearchProduct}>
                                <button type="submit">
                                    <BsSearch />
                                </button>
                                <input
                                    type="search"
                                    value={searchKeyword}
                                    placeholder="Search courses..."
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                ></input>
                            </form>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#7b1fa2",
                                        lineHeight: "2",
                                        colorPrimaryBorder: "#7b1fa2",
                                    },
                                }}
                            >
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
                                        onChange={handleLevelFilterChange}
                                    >
                                        <Row>
                                            <Col span={24}>
                                                <div className="checkbox">
                                                    <Checkbox value="Hangul">
                                                        Hangul 한글
                                                    </Checkbox>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <div className="checkbox">
                                                    <Checkbox value="Beginner">
                                                        Beginner
                                                    </Checkbox>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <div className="checkbox">
                                                    <Checkbox value="Intermediate">
                                                        Intermediate
                                                    </Checkbox>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <div className="checkbox">
                                                    <Checkbox value="Advanced">
                                                        Advanced
                                                    </Checkbox>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </div>
                                <div className="filter-box">
                                    <h2>Price Range</h2>
                                    <Slider
                                        range
                                        step={5}
                                        max={30}
                                        min={0}
                                        defaultValue={[0, 30]}
                                        marks={{ 0: "$0", 30: "$30" }}
                                        onChange={handlePriceRangeChange}
                                    />
                                </div>
                                <div className="filter-box">
                                    <h2 style={{ marginTop: "59px" }}>
                                        Ratings
                                    </h2>
                                </div>
                            </ConfigProvider>
                        </div>
                        <div className="col-md-9">
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
