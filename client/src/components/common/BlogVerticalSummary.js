// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import { useState } from "react";
import TitleCard from "../cards/TitleCard";
import BlogPostCardVertical from "../cards/BlogPostCardVertical";
import Loading from "./Loading";
import useBlogList from "../../hooks/useBlogList";

export default function BlogVerticalSummary() {
    //hooks
    const blogList = useBlogList("/blog/list?limit=4", () =>
        setIsBlogListLoading(false)
    );

    //states
    const [isBlogListLoading, setIsBlogListLoading] = useState(true);

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
                {isBlogListLoading && <Loading />}
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
