import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminBlog(){

    const [auth, setAuth] = useAuth();
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post('/category');
            if(data?.error){
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is created`)
            }
        } catch(err){
            console.log(err)
            toast.error("Blog post failed. Try again.")
        }
    }

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                subTitle="Admin Dashboard"
            />
            <div style={{ maxWidth: "1170px", height: "500px"}}
                 className="container-fluid"
            >
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Create Blog</div>
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <input type="text"
                                       className="form-control p-3"
                                       placeholder="Blog title"
                                       value = {title}
                                       onChange={(e) => setTitle(e.target.value)}
                                />
                                <button className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
