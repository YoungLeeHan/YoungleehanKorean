// 👻 Developed by DanBi Choi on Aug 2nd, 2023.
// -----------------------------------------------------
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Blog Posts</div>
            <div className="blog-list-box">
              {list?.map((post) => (
                <div key={post._id} style={{ border: "1px solid gray" }}>
                  <h3>{post.title}</h3>
                  <p>{post.value}</p>
                  <p>{post.createdAt}</p>
                  <p>{post.category?.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
