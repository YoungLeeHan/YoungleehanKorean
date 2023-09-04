// 👻 Developed by DanBi Choi on Aug 30th, 2023.
// -----------------------------------------------------
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import DashboardMenu from "../../components/nav/DashboardMenu";
import ProductCardHorizontal from "./../../components/cards/ProductCardHorizontal";
import useScrollToTop from "./../../hooks/useScrollToTop";
import useProductList from "../../hooks/useProductList";
import { maxWidth } from "../../constants/constant";

export default function ProductList() {
    // hooks
    const [auth, setAuth] = useAuth();
    useScrollToTop();
    const productList = useProductList("/products");

    return (
        <>
            <Jumbotron
                title={`Hello ${auth?.user?.firstName}`}
                directory={"Admin Dashboard"}
                subDirectory={"View Products"}
            />
            <div style={{ maxWidth: maxWidth }} className="container-fluid">
                <div className="row" style={{ margin: "75px 0" }}>
                    <div className="col-md-3">
                        <DashboardMenu id={4} menutype={"admin"} />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Product List
                        </div>
                        {productList?.map((p) => (
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
