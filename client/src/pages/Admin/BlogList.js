// 👻 Developed by DanBi Choi on Aug 2nd, 2023.
// -----------------------------------------------------
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

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
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Blog Posts
                        </div>
                        <div className="blog-list-box">
                            {list?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/blog/update/${p.slug}`}
                                >
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/blog/images/${p._id}`}
                                                    alt={`${p.title}`}
                                                    className="img img-fluid rounded-start"
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {p.title}
                                                    </h5>
                                                    <p className="card-text">
                                                        {p.value}
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-muted">
                                                            {moment(
                                                                p.createdAt
                                                            ).format(
                                                                "MMMM Do YYYY, h:mm:ss a"
                                                            )}
                                                        </small>
                                                    </p>
                                                    <p className="card-text">
                                                        {p.category?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
