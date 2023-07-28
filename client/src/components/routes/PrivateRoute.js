import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "../routes/Loading";
import axios from "axios";

export default function PrivateRoute() {
  // eslint-disable-next-line
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
}
