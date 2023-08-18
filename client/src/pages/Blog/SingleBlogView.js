// 👻 Developed by DanBi Choi on Aug 11th, 2023.
// -----------------------------------------------------
import "../../styles/pages/Blog/SingleBlogView.scss";
import Jumbotron from "../../components/cards/Jumbotron";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import loadingGIF from "../../assets/images/Common/loading.gif";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import BlogCommentForm from "../../components/forms/BlogCommentForm";
import BlogCommentCard from "../../components/cards/BlogCommentCard";

export default function SingleBlogView() {
    useScrollToTop();

    // hooks
    const params = useParams();

    //state
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState();

    useEffect(() => {
        if (params.slug) {
            loadSinglePost();
        }
    }, []);

    const loadSinglePost = async () => {
        try {
            const { data } = await axios.get(`/blog/${params.slug}`);
            setPost(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (post) {
            setPostId(post._id);
            loadBlogComments();
        }
    }, [post]);

    const loadBlogComments = async () => {
        try {
            const { data } = await axios.get(`/blog/comment/${post._id}`);
            setComments(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron
                title={"Blog"}
                directory={"Blog"}
                subDirectory={post?.title}
            />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="row">
                    <div
                        className="post-box col-md-12"
                        style={{ margin: "75px 0" }}
                    >
                        {isLoading && (
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
                        <div className="img-box" style={{ width: "100%" }}>
                            {!isLoading && (
                                <img
                                    src={`${process.env.REACT_APP_API}/blog/images/${post._id}`}
                                    alt={post?.title}
                                />
                            )}
                        </div>
                        <div className="post-info">
                            <h1>{post?.title}</h1>
                            <h3>
                                <AiOutlineUser fill="#7b1fa2" /> By YoungHyun
                                <MdOutlineDateRange
                                    fill="#7b1fa2"
                                    style={{ marginLeft: "15px" }}
                                />{" "}
                                {moment(post?.createdAt).format("MMMM DD YYYY")}
                            </h3>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: post?.value }} />
                    </div>
                    <div className="col-md-6 post-comment-box">
                        <BlogCommentForm
                            postId={postId}
                            loadBlogComments={loadBlogComments}
                        />
                    </div>
                    <div className="col-md-6 post-comment-list ">
                        <h3>Recent Comments</h3>
                        <ul>
                            {comments &&
                                comments.map((comment) => (
                                    <div key={comment._id}>
                                        <BlogCommentCard
                                            comment={comment}
                                            loadBlogComments={loadBlogComments}
                                        />
                                    </div>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

const commentsDummy = [
    {
        _id: 1,
        name: "Danbi",
        createdAt: new Date(),
        content:
            "Qui esse fugiat officia occaecat cupidatat consequat incididunt dolore ex enim.",
        likeCount: 3,
    },
    {
        _id: 2,
        name: "Young",
        createdAt: new Date(),
        content:
            "Elit ullamco occaecat id et ex sit. Veniam ex veniam incididunt pariatur pariatur deserunt laborum.",
        likeCount: 8,
    },
    {
        _id: 3,
        name: "May",
        createdAt: new Date(),
        content:
            "Aliquip aliquip proident aliqua magna nostrud eiusmod ullamco. Reprehenderit nisi ex ullamco nisi eu deserunt velit dolor non fugiat dolore aute. Mollit esse eiusmod culpa occaecat non. Velit est velit aliquip eiusmod in elit. Duis sit consequat sint sit nostrud commodo non sint et.",
        likeCount: 13,
    },
];
