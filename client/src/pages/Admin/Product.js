import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminProduct(){

    const [auth, setAuth] = useAuth();

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                subTitle="Admin Dashboard"
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Create Product</div>
                        <p>Create product...</p>
                    </div>
                </div>
            </div>
        </>
    )
}
