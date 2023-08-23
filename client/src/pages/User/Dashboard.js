import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function UserDashboard() {
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useScrollToTop();

    // redirect anonymous user
    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <Jumbotron
                title={`Hello, ${auth?.user?.firstName}!`}
                directory={"Dashboard"}
            />
            <div
                style={{ maxWidth: "1170px", minHeight: "300px" }}
                className="container-fluid"
            >
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={0} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            User Information
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                {auth?.user?.firstName} {auth?.user?.lastName}
                            </li>
                            <li className="list-group-item">
                                {auth?.user?.email}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
