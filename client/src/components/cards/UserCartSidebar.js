import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

export default function UserCartSidebar() {
    const [auth, setAuth] = useAuth();

    const [clientToken, setClientToken] = useState("");

    useEffect(() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/braintree/token");
            // {data} is from the response we get from getToken function

            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h3>Hi</h3>
            <p>{JSON.stringify(clientToken, null, 4)}</p>
            <div>
                <DropIn
                    options={{
                        authorization: clientToken,
                        paypal: {
                            flow: "vault",
                        },
                    }}
                />
            </div>
        </>
    );
}
