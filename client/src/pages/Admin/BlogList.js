// 👻 Developed by DanBi Choi on Aug 2nd, 2023.
// -----------------------------------------------------
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import BlogPostCardHorizontal from "./../../components/cards/BlogPostCardHorizontal";

export default function BlogList() {
    // context
    const [auth, setAuth] = useAuth();

    //states
    const [list, setList] = useState([]);

    // fetch blog list from DB
    useEffect(() => {
        loadBlogList();
    }, []);

    const loadBlogList = async () => {
        try {
            const { data } = await axios.get("/blog/list");
            if (data.error) {
                toast.error(data.error);
            } else {
                setList(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"Blog Posts"}
            />
            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <DashboardMenu id={7} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Blog Posts
                        </div>
                        <div className="blog-list-box">
                            {list?.map((p) => (
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
