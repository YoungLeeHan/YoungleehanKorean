// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import { useState } from "react";
import TitleCard from "../cards/TitleCard";
import ProductCardVertical from "../cards/ProductCardVertical";
import Loading from "./Loading";
import useProductList from "../../hooks/useProductList";

export default function ShopVerticalSummary() {
    //hooks
    const productList = useProductList("/products?limit=4", () =>
        setIsShopListLoading(false)
    );

    //states
    const [isShopListLoading, setIsShopListLoading] = useState(true);

    return (
        <section
            className="shop d-flex flex-column align-items-center"
            style={{ width: "100%", marginBottom: "30px" }}
        >
            <TitleCard
                sectionTitle={"Top Marterials"}
                mainTitle1={"Explore"}
                mainTitle2={"YoungLeeHan Worksheets"}
                subParagraph={
                    "Ready-to-use materials for students, parents, and teachers."
                }
            />
            <div className="row" style={{ width: "100%" }}>
                {isShopListLoading && <Loading />}
                {!isShopListLoading &&
                    productList &&
                    productList.map((item) => (
                        <div
                            className="col-md-3 d-flex flex-column justify-content-between align-items-center"
                            key={item._id}
                        >
                            <ProductCardVertical item={item} />
                        </div>
                    ))}
            </div>
        </section>
    );
}
