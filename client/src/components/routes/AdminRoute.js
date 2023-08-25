import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "../routes/Loading";
import axios from "axios";

export default function AdminRoute() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const adminCheck = async () => {
            try {
                const { data } = await axios.get(`/admin-check`);
                if (data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (auth?.token) adminCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Loading path="dashboard/user/orders" />;
}
