import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Loading({path = "login"}) {
    // state
    const [count, setCount] = useState(3)
    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((curr)=> --curr);
        }, 1000)

        // redirect once count is equal to 0
        count === 0 &&
        navigate(`/${path}`, {
            state: location.pathname,
        });

        // cleanup

        return () => clearInterval(interval);

    }, [count]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">Redirecting you in {count} seconds</div>
    )

}