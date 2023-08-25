// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import { useEffect, useState } from "react";
import TitleCard from "../cards/TitleCard";
import axios from "axios";
import loadingGIF from "../../assets/images/Common/loading.gif";
import BlogPostCardVertical from "../cards/BlogPostCardVertical";

export default function BlogVerticalSummary() {
    //states
    const [blogList, setBlogList] = useState([]);
    const [isBlogListLoading, setIsBlogListLoading] = useState(true);

    useEffect(() => {
        loadBlogPosts();
    }, []);

    const loadBlogPosts = async () => {
        setIsBlogListLoading(true);
        try {
            const { data } = await axios.get(`/blog/list?limit=4`);
            setBlogList(data);
        } catch (err) {
            console.log(err);
        }
        setIsBlogListLoading(false);
    };

    return (
        <section
            className="blog d-flex flex-column align-items-center"
            style={{ width: "100%", marginBottom: "30px" }}
        >
            <TitleCard
                sectionTitle={"Blog"}
                mainTitle1={"Stories"}
                mainTitle2={"& More"}
                subParagraph={
                    "YoungLeeHan’s editors dish about Korean culture and drop some Korean language knowledge."
                }
            />
            <div className="row" style={{ width: "100%" }}>
                {isBlogListLoading && (
                    <div
                        className="d-flex justify-content-center"
                        style={{ margin: "200px 0" }}
                    >
                        <img
                            src={loadingGIF}
                            alt="Loading"
                            style={{
                                width: "50px",
                                height: "50px",
                            }}
                        />
                    </div>
                )}
                {!isBlogListLoading &&
                    blogList &&
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
    );
}
