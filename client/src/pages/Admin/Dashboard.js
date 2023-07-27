import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/Jumbotron";

export default function AdminDashboard(){

    const [auth, setAuth] = useAuth();

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                subTitle="Admin Dashboard"
                />

            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </>
    )

}