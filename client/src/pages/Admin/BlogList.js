// 👻 Developed by DanBi Choi on Aug 2nd, 2023.
// -----------------------------------------------------
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import BlogPostCardHorizontal from "./../../components/cards/BlogPostCardHorizontal";
import useScrollToTop from "./../../hooks/useScrollToTop";
import useBlogList from "../../hooks/useBlogList";
import { maxWidth } from "../../constants/constant";

export default function BlogList() {
    // hooks
    const [auth, setAuth] = useAuth();
    const blogList = useBlogList("/blog/list");
    useScrollToTop();

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"Blog Posts"}
            />
            <div style={{ maxWidth: maxWidth }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={7} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Blog Posts
                        </div>
                        <div className="blog-list-box">
                            {blogList?.map((p) => (
                                <BlogPostCardHorizontal
                                    key={p._id}
                                    post={p}
                                    modify={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
