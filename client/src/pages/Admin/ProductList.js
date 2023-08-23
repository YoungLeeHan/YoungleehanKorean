import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import axios from "axios";
import ProductCardHorizontal from "./../../components/cards/ProductCardHorizontal";

export default function ProductList() {
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"View Products"}
            />
            <div style={{ maxWidth: "1170px" }} className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <DashboardMenu id={4} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Product List
                        </div>
                        {products?.map((p) => (
                            <ProductCardHorizontal
                                key={p._id}
                                product={p}
                                modify={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
