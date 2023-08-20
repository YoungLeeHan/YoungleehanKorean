// 👻 Developed by DanBi Choi on July 19th, 2023.
// 👻 Developed by DanBi Choi on Aug 18th, 2023. (Blog section updated)
// -----------------------------------------------------
import CustomerTypesCard from "../components/cards/CustomerTypesCard";
import "../styles/pages/Home.scss";
import { customerTypesData } from "../assets/data/customerTypesData";
import { Link } from "react-router-dom";
import TitleCard from "../components/cards/TitleCard";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCardVertical from "../components/cards/ProductCardVertical";
import BlogPostCardVertical from "../components/cards/BlogPostCardVertical";
import loadingGIF from "../assets/images/Common/loading.gif";

export default function Home() {
    //states
    const [shopList, setShopList] = useState([]);
    const [isShopListLoading, setIsShopListLoading] = useState(true);
    const [blogList, setBlogList] = useState([]);
    const [isBlogListLoading, setIsBlogListLoading] = useState(true);

    useEffect(() => {
        loadBlogPosts();
        loadShopList();
    }, []);

    const loadShopList = async () => {
        setIsShopListLoading(true);
        try {
            const { data } = await axios.get(`/products?limit=4`);
            setShopList(data);
            setIsShopListLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const loadBlogPosts = async () => {
        setIsBlogListLoading(true);
        try {
            const { data } = await axios.get(`/blog/list?limit=4`);
            setBlogList(data);
            setIsBlogListLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            style={{ maxWidth: "1170px" }}
            className="container-fluid d-flex flex-column align-items-center"
        >
            <section
                className="landing-view"
                style={{
                    width: "100vw",
                    backgroundColor: "#f6f4ee",
                }}
            >
                <div
                    style={{ margin: "auto", maxWidth: "1170px" }}
                    className="container-fluid"
                >
                    <div className="row">
                        <div className="col-md-7">
                            <h1>Discover the joy of learning Korean!</h1>
                            <p>
                                Dive into a fun-filled language journey with me!
                                <br />
                                Improve your Korean with my inspiring materials,
                                which explore K-Drama, K-Pop, and Korean culture
                                and target the areas of the Korean language
                                where I have students struggle the most in my
                                years of teaching.
                            </p>
                            <h5>
                                Youngleehan:영리한 means smart; clever; bright;
                                intelligent in Korean.
                            </h5>
                            <Link to="/shop">
                                <button className="btn btn-primary mb-3">
                                    Explore Products
                                </button>
                            </Link>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                            <img
                                src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
                                alt="cat"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="customerTypes container-fluid d-flex flex-column align-items-center">
                <TitleCard
                    sectionTitle={"Our Customers"}
                    mainTitle2={"YoungLeeHan Korean"}
                    mainTitle3={"For You"}
                    subParagraph={
                        "YoungLeeHan Korean materials are great for learners looking to study on their own, parents searching for activities to keep their kids entertained while learning, and teachers sourcing exercises for their students."
                    }
                />
                <div className="row" style={{ width: "100%" }}>
                    {customerTypesData?.map((data) => (
                        <div className="col-md-4 mb-3" key={data._id}>
                            <CustomerTypesCard data={data} />
                        </div>
                    ))}
                </div>
            </section>

            <section
                className="creatorStory container-fluid"
                style={{ width: "100%" }}
            >
                <TitleCard
                    sectionTitle={"Creator Story"}
                    mainTitle1={"Why"}
                    mainTitle2={"YoungLeeHan Korean"}
                    mainTitle3={"Started"}
                />
                <div className="story-box row">
                    <div className="col-md-4 mb-3">
                        <img
                            src="https://catastic.b-cdn.net/wp-content/uploads/2023/04/white-british-cat-are-wear-sunglass-shirt-concept-summer-yellow-background-1.jpg"
                            alt="Founder"
                        />
                    </div>
                    <div className="col-md-8 mb-3 d-flex flex-column justify-content-between text-start">
                        <h5>“Why aren’t there more exercises?”</h5>
                        <p>
                            While teaching Korean, I was often frustrated by the
                            amount of exercises for each grammar point in the
                            textbooks. I would search the web for worksheets to
                            give my students the extra practice they needed to
                            master a grammar point. However, that was still not
                            enough, so I decided to create on my own.
                        </p>
                        <Link to={"/about"} className="link-button">
                            <button className="btn btn-primary">
                                About Creator
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            <section
                className="shop d-flex flex-column align-items-center"
                style={{ width: "100%", marginBottom: "30px" }}
            >
                <TitleCard
                    sectionTitle={"Top Marterials"}
                    mainTitle1={"Explore"}
                    mainTitle2={"YoungLeeHan Worksheets"}
                    subParagraph={
                        "Ready-to-use materials for students, parents, and teachers."
                    }
                />
                <div className="row" style={{ width: "100%" }}>
                    {isShopListLoading && <div>{loadingGIF}</div>}
                    {shopList &&
                        shopList.map((item) => (
                            <div
                                className="col-md-3 d-flex flex-column justify-content-between align-items-center"
                                key={item._id}
                            >
                                <ProductCardVertical item={item} />
                            </div>
                        ))}
                </div>
            </section>
            <section
                className="blog d-flex flex-column align-items-center"
                style={{ width: "100%", marginBottom: "30px" }}
            >
                <TitleCard
                    sectionTitle={"Blog"}
                    barWidth={"80px"}
                    mainTitle1={"Stories"}
                    mainTitle2={"& More"}
                    subParagraph={
                        "YoungLeeHan’s editors dish about Korean culture and drop some Korean language knowledge."
                    }
                />
                <div className="row" style={{ width: "100%" }}>
                    {isBlogListLoading && <div>{loadingGIF}</div>}
                    {blogList &&
                        blogList.map((post) => (
                            <div
                                className="col-md-3 d-flex flex-column justify-content-between align-items-center"
                                key={post._id}
                            >
                                <BlogPostCardVertical post={post} />
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}
