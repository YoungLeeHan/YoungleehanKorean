import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function PrivateRoute(){
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(auth?.token) {
            setOK(true);
        } else {
            setOK(false);
        }
    }, [auth?.token]);

    return ok ? <Outlet/>: "Loading...";
}