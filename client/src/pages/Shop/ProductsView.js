// 👻 Developed by DanBi Choi on July 25th, 2023. (UI)
// 👻 Developed by DanBi Choi on July 28th, 2023. (Filter & Sorting Feature)
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import ScrollToTop from "../../components/nav/ScrollToTop";
import useWindowWidth from "../../hooks/useWindowWidth";
import "../../styles/pages/ProductsView.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Checkbox, ConfigProvider, Slider } from "antd";
import { Rating } from "semantic-ui-react";
import ProductCard from "../../components/cards/ProductCard";
import ResponsiveShowFilter from "../../components/common/ResponsiveShowFilter";

export default function ProductsView() {
  ScrollToTop();

  // states
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [level, setLevel] = useState();
  const [age, setAge] = useState();
  const [priceRange, setPriceRange] = useState();
  const [reviewRate, setReviewRate] = useState();
  const [sortBy, setSortBy] = useState("");

  // hooks
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 767) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }, [windowWidth]);

  const handleShowFilter = (e) => {
    e.preventDefault();
    setShowFilter((curr) => !curr);
  };

  useEffect(() => {
    if (!level && !age && !priceRange && !reviewRate) {
      //loadProducts();
      setProducts(mockProductData);
    }
  }, []);

  // const loadProducts = async () => {
  //     try {
  //         const { data } = await axios.get(`/products`);
  //         setProducts(data);
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  // Load filtered products when any filter is activated
  useEffect(() => {
    if (level || age || priceRange || reviewRate) {
      loadFilteredProducts();
    }
  }, [level, age, priceRange, reviewRate]);

  const loadFilteredProducts = async () => {
    console.log({
      level,
      age,
      priceRange,
      reviewRate,
    });
    // try {
    //     const { data } = await axios.post(`/filtered-products`, {
    //         level,
    //         age,
    //         priceRange,
    //         reviewRate,
    //     });
    //     setProducts(data);
    // } catch (err) {
    //     console.log(err);
    // }
  };

  const handleSearchProduct = (e) => {
    e.preventDefault();
    console.log(`searching for ${searchKeyword}`);
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

  // Rating filter
  const handleRatingFilterChange = (checkedValues) => {
    setReviewRate(checkedValues);
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
        sortedProducts = [...products]?.sort((a, b) => {
          return b.createdAt - a.createdAt;
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
        sortedProducts = [...products]?.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        break;
    }
    setProducts(sortedProducts);
  };

  const mockProductData = [
    {
      _id: 1,
      title: "Korean Alphabet Book111",
      slug: "korean-alphabet-book",
      image:
        "https://images.perthnow.com.au/publication/C-7312600/47e615abf005f1882ddb12a2bf86ab8c7a696670-16x9-x0y456w7360h4140.jpg?imwidth=668&impolicy=pn_v3",
      category: "beginner",
      age: "kids",
      description:
        "Adipisicing aliquip quis consectetur nulla reprehenderit tempor ex enim nisi id quis in. Quis enim incididunt non elit excepteur et id laborum culpa enim velit cillum eu aliquip. Minim est minim non in excepteur sint occaecat magna labore. Officia sit et cupidatat fugiat eu ut aute dolor sint ipsum id ut. Laborum velit elit officia quis dolor laborum pariatur velit ad. Nisi amet nostrud quis occaecat non est in duis. Duis irure do ex mollit voluptate culpa ullamco anim incididunt incididunt quis velit.",
      price: 7.99,
      reviewRate: 4.7,
      reviewNumber: 27,
      numberSold: 10,
      createdAt: new Date(),
    },
    {
      _id: 2,
      title: "Korean Alphabet Book222",
      slug: "korean-alphabet-book222",
      image:
        "https://images.perthnow.com.au/publication/C-7312600/47e615abf005f1882ddb12a2bf86ab8c7a696670-16x9-x0y456w7360h4140.jpg?imwidth=668&impolicy=pn_v3",
      category: "advanced",
      age: "kids",
      description:
        "Dolor id culpa labore qui. Ut occaecat exercitation incididunt do. Aute consectetur nostrud Lorem ut in proident veniam proident aliqua aute proident irure magna. Ullamco duis excepteur dolor do excepteur commodo exercitation adipisicing non aliquip. Consequat veniam sit mollit esse est. Magna est occaecat culpa aliquip reprehenderit aliquip non nostrud proident quis officia ut aliquip. Laborum eu consectetur commodo quis elit duis pariatur excepteur velit.",
      price: 4.99,
      reviewRate: 3.9,
      reviewNumber: 52,
      numberSold: 15,
      createdAt: new Date(),
    },
    {
      _id: 3,
      title: "Korean Alphabet Book333",
      slug: "korean-alphabet-book333",
      image:
        "https://images.perthnow.com.au/publication/C-7312600/47e615abf005f1882ddb12a2bf86ab8c7a696670-16x9-x0y456w7360h4140.jpg?imwidth=668&impolicy=pn_v3",
      category: "hangul",
      age: "adults",
      description:
        "Reprehenderit reprehenderit anim et officia incididunt occaecat do esse amet. Ipsum occaecat nisi culpa elit ad anim et est veniam nulla. Laborum in ex ullamco laborum Lorem deserunt. Incididunt exercitation et reprehenderit incididunt amet enim elit aute enim nulla quis. Aliquip enim mollit culpa sit cupidatat. Dolor nulla et occaecat ut voluptate esse ut. Culpa voluptate quis sit occaecat.",
      price: 12.99,
      reviewRate: 4.5,
      reviewNumber: 29,
      numberSold: 20,
      createdAt: new Date(),
    },
  ];

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
                  onChange={(e) => setSearchKeyword(e.target.value)}
                ></input>
              </form>
              {/* Filter #1: Product Search ends here*/}
              {/* 👉 Mobile responsive show/hide filter button starts here */}
              {windowWidth < 767 && (
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
                          "hangul 한글",
                          "beginner",
                          "intermediate",
                          "advanced",
                        ]}
                        onChange={handleLevelFilterChange}
                      >
                        <Row>
                          {[
                            "hangul 한글",
                            "beginner",
                            "intermediate",
                            "advanced",
                          ].map((item, i) => (
                            <Col span={24} key={i}>
                              <div className="checkbox">
                                <Checkbox value={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
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
                        defaultValue={["kids", "adults"]}
                        onChange={handleAgeFilterChange}
                      >
                        <Row>
                          {["kids", "adults"].map((group, i) => (
                            <Col span={24} key={i}>
                              <div className="checkbox">
                                <Checkbox value={group}>
                                  {group.charAt(0).toUpperCase() +
                                    group.slice(1)}
                                </Checkbox>
                              </div>
                            </Col>
                          ))}
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
                          onChange={handlePriceRangeChange}
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
                    {/* 👉 Filter #5: filter by rating starts here*/}
                    <div className="filter-box">
                      <h2>Ratings</h2>
                      <Checkbox.Group
                        style={{
                          width: "100%",
                        }}
                        defaultValue={[5, 4, 3, 2, 1]}
                        onChange={handleRatingFilterChange}
                      >
                        <Row>
                          {[5, 4, 3, 2, 1].map((rate, i) => (
                            <Col span={24} key={i}>
                              <div className="checkbox2">
                                <Checkbox value={rate}>
                                  <Rating
                                    defaultRating={rate}
                                    maxRating={5}
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
                <h5>{products?.length} items available</h5>
                <div className="dropdown">
                  <li>
                    <a className="dropdown-toggle" data-bs-toggle="dropdown">
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
                              setSortBy(e.target.innerHTML);
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
              {products?.length > 0 &&
                products?.map((product) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              {products?.length === 0 && (
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
