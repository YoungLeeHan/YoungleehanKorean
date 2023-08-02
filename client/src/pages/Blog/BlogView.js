// 👻 Developed by DanBi Choi on July 27th, 2023. (UI)
// 👻 Developed by DanBi Choi on July 28th, 2023. (Filter feature added)
// 👻 Developed by DanBi Choi on Aug 1st, 2023. (Search feature added)
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import ScrollToTop from "../../components/nav/ScrollToTop";
import "../../styles/pages/ProductsView.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Checkbox, ConfigProvider } from "antd";
import BlogPostCard from "../../components/cards/BlogPostCard";
import useWindowWidth from "../../hooks/useWindowWidth";
import ResponsiveShowFilter from "../../components/common/ResponsiveShowFilter";
import { toast } from "react-hot-toast";

export default function BlogView() {
    ScrollToTop();

    // states
    const [showFilter, setShowFilter] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [blogList, setBlogList] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState();

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

    // fetch blog list from DB on first page loading
    useEffect(() => {
        if (!categoryFilter) {
            loadBlogPosts();
            toast.error(
                "Blog page is under construction. These are dummy data."
            );
        }
    }, []);

    const loadBlogPosts = async () => {
        setBlogList(dummyData);

        // try {
        // 	const {data} = await axios.get(`/bloglist`);
        // 	setBlogList(data);
        // } catch (err) {
        // 	console.log(err);
        // }
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
        toast.error("Filter endpoints are under construction.");
        console.log({
            categoryFilter,
        });
        // try {
        //     const { data } = await axios.post(`/filtered-bloglist`, {
        //         categoryFilter
        //     });
        //     setBlogList(data);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    // Blog Post Search
    useEffect(() => {
        handleSearchBlog();
    }, [searchKeyword]);

    const handleSearchBlog = async () => {
        // if there is a search keyword, search database with that keyword
        if (searchKeyword) {
            console.log(`searching for ${searchKeyword}`);
            // try {
            //     const { data } = await axios.get(
            //         `/blog/search/${searchKeyword}`
            //     );
            //     setBlogList(data);
            // } catch (err) {
            //     console.log(err);
            // }
        } else {
            // if keyword is/became empty, fetch all posts from database
            loadBlogPosts();
        }
    };

    const dummyData = [
        {
            _id: "1",
            title: "How to write Korean1",
            content:
                "Sint excepteur voluptate adipisicing et Lorem non. Sunt incididunt dolore laboris excepteur velit occaecat qui veniam fugiat. Sint officia ex labore mollit duis duis voluptate deserunt deserunt aute magna labore. Deserunt irure esse officia aliquip esse eu nostrud Lorem ea dolore deserunt ex. Nulla elit esse laborum laboris cupidatat consectetur duis ut. Commodo in enim non pariatur commodo elit occaecat anim nostrud eu non ea. Aute laboris ad sunt reprehenderit non eu anim commodo excepteur sunt ipsum nisi excepteur dolore.",
            writer: "YoungHyun",
            createdAt: new Date(),
        },
        {
            _id: "2",
            title: "How to write Korean2",
            content:
                "Ipsum reprehenderit mollit est adipisicing non consectetur exercitation esse in commodo dolor nulla incididunt Lorem. Enim officia excepteur fugiat cillum. Mollit aliquip laborum cupidatat sunt sint eu aliqua. Cillum cillum id deserunt non nostrud nulla quis eiusmod pariatur eiusmod adipisicing. Labore id nulla pariatur amet cillum magna reprehenderit eu amet duis Lorem. Proident cillum ea proident enim aliquip ad. Eiusmod elit labore consequat nostrud commodo consectetur commodo Lorem quis mollit laboris nisi culpa.",
            writer: "YoungHyun",
            createdAt: new Date(),
        },
        {
            _id: "3",
            title: "How to write Korean3",
            content:
                "Cillum consequat laboris voluptate nostrud duis ut voluptate sint non proident duis velit. Veniam quis officia ad eiusmod mollit sit eu id voluptate. Est nostrud exercitation mollit pariatur velit labore proident. Minim ullamco nulla aliqua qui nisi pariatur nisi ea. Fugiat eu do et in aute cillum dolore labore magna nisi id quis. Proident magna magna duis ex magna minim deserunt elit pariatur sint. Commodo esse reprehenderit magna laboris et duis irure excepteur ex.",
            writer: "YoungHyun",
            createdAt: new Date(),
        },
    ];

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
                                        {/* 👉 Filter #2: filter by category starts here*/}
                                        <div className="filter-box">
                                            <h2>Category</h2>
                                            <Checkbox.Group
                                                style={{
                                                    width: "100%",
                                                }}
                                                defaultValue={[
                                                    "Grammar",
                                                    "Speaking",
                                                    "Pronunciation",
                                                    "Writing",
                                                ]}
                                                onChange={
                                                    handleCategoryFilterChange
                                                }
                                            >
                                                <Row>
                                                    {[
                                                        "Grammar",
                                                        "Speaking",
                                                        "Pronunciation",
                                                        "Writing",
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
                                        {/* Filter #2: filter by category ends here*/}
                                    </ConfigProvider>
                                </>
                            )}
                        </div>
                        <div className="col-md-9">
                            {blogList?.map((post) => (
                                <div key={post._id}>
                                    <BlogPostCard post={post} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
