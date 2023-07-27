// 👻 Developed by DanBi Choi on July 27th, 2023.
// -----------------------------------------------------
import Jumbotron from "../../components/cards/Jumbotron";
import ScrollToTop from "../../components/nav/ScrollToTop";
import "../../styles/pages/ProductsView.scss";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Checkbox, ConfigProvider } from "antd";
import BlogPostCard from "../../components/cards/BlogPostCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function BlogView() {
    ScrollToTop();

    // states
    const [isFilterOn, setIsFilterOn] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [blogList, setBlogList] = useState([]);

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

    const handleSearchBlog = (e) => {
        e.preventDefault();
        console.log(`searching for ${searchKeyword}`);
    };

    // Blog Category filter
    const handleCategoryFilterChange = (checkedValues) => {
        console.log(checkedValues);
    };

    // fetch blog list from DB
    useEffect(() => {
        loadBlogPosts();
        setBlogList(dummyData);
    }, []);

    const loadBlogPosts = async () => {
        // try {
        // 	const {data} = await axios.get(`/bloglist`);
        // 	setBlogList(data);
        // } catch (err) {
        // 	console.log(err);
        // }
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
                            <form onSubmit={handleSearchBlog}>
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
