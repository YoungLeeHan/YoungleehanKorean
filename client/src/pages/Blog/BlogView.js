// 👻 Developed by DanBi Choi on July 27th, 2023. (UI)
// 👻 Developed by DanBi Choi on July 28th, 2023. (Filter feature added)
// 👻 Developed by DanBi Choi on Aug 1st, 2023. (Search feature added)
// 👻 Developed by DanBi Choi on Aug 11th, 2023. (Back-end connection established)
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import "../../styles/pages/ProductsView.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Checkbox, ConfigProvider } from "antd";
import BlogPostCardHorizontal from "../../components/cards/BlogPostCardHorizontal";
import useWindowWidth from "../../hooks/useWindowWidth";
import ResponsiveShowFilter from "../../components/common/ResponsiveShowFilter";
import { mobileWidth } from "../../constants/constant";
import Loading from "../../components/common/Loading";

export default function BlogView() {
    useScrollToTop();

    // states
    const [showFilter, setShowFilter] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [blogList, setBlogList] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [blogCategories, setBlogCategories] = useState([]);

    // hooks
    const windowWidth = useWindowWidth();

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

    // fetch blog categories list from DB on first page loading
    useEffect(() => {
        loadBlogCategories();
    }, []);

    const loadBlogCategories = async () => {
        try {
            const { data } = await axios.get("/blog/category/list");
            setBlogCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    // fetch blog list from DB on first page loading
    useEffect(() => {
        if (!categoryFilter) {
            loadBlogPosts();
        }
    }, []);

    // previous code
    const loadBlogPosts = async () => {
        try {
            const { data } = await axios.get(`/blog/list`);
            setBlogList(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Blog Category filter
    const handleCategoryFilterChange = (checkedValues) => {
        setCategoryFilter(checkedValues);
    };

    // Load filtered posts only when filter is activated
    useEffect(() => {
        if (categoryFilter) {
            loadFilteredPosts();
        }
    }, [categoryFilter]);

    const loadFilteredPosts = async () => {
        try {
            const { data } = await axios.post(`/blog/filtered-bloglist`, {
                categoryFilter,
            });
            setBlogList(data);
        } catch (err) {
            console.log(err);
        }
    };

    // Blog Post Search
    useEffect(() => {
        if (searchKeyword) handleSearchBlog();
    }, [searchKeyword]);

    const handleSearchBlog = async () => {
        // if there is a search keyword, search database with that keyword
        if (searchKeyword) {
            try {
                const { data } = await axios.get(
                    `/blog/search/${searchKeyword}`
                );
                setBlogList(data);
            } catch (err) {
                console.log(err);
            }
        } else {
            // if keyword is/became empty, fetch all posts from database
            loadBlogPosts();
        }
    };

    return (
        <>
            <Jumbotron title={"Blog"} directory={"Blog"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="shop-productsView-box container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            {/* 👉 Filter #1: Product Search starts here*/}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearchBlog();
                                }}
                            >
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
                                                colorPrimary: "#7b1fa2",
                                                lineHeight: "2",
                                                colorPrimaryBorder: "#7b1fa2",
                                            },
                                        }}
                                    >
                                        {/* Ant Design UI style setting change ends here*/}
                                        {/* 👉 Filter #2: filter by blog category starts here*/}
                                        <div className="filter-box">
                                            <h2>Category</h2>
                                            <Checkbox.Group
                                                style={{
                                                    width: "100%",
                                                }}
                                                onChange={
                                                    handleCategoryFilterChange
                                                }
                                            >
                                                <Row>
                                                    {blogCategories?.map(
                                                        (category) => (
                                                            <Col
                                                                span={24}
                                                                key={
                                                                    category._id
                                                                }
                                                            >
                                                                <div className="checkbox">
                                                                    <Checkbox
                                                                        value={
                                                                            category._id
                                                                        }
                                                                    >
                                                                        {category.name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            category.name.slice(
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
                                        {/* Filter #2: filter by category ends here*/}
                                    </ConfigProvider>
                                </>
                            )}
                        </div>
                        <div className="col-md-9">
                            {isLoading && <Loading />}
                            {blogList?.length > 0 &&
                                !isLoading &&
                                blogList?.map((post) => (
                                    <div key={post._id}>
                                        <BlogPostCardHorizontal post={post} />
                                    </div>
                                ))}

                            {blogList?.length === 0 && !isLoading && (
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "200px 0",
                                    }}
                                >
                                    No matching post found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
