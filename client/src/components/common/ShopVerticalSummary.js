// 👻 Developed by DanBi Choi on Aug 24th, 2023.
// -----------------------------------------------------
import { useEffect, useState } from "react";
import TitleCard from "../cards/TitleCard";
import axios from "axios";
import ProductCardVertical from "../cards/ProductCardVertical";
import Loading from "./Loading";

export default function ShopVerticalSummary() {
    //states
    const [shopList, setShopList] = useState([]);
    const [isShopListLoading, setIsShopListLoading] = useState(true);

    useEffect(() => {
        loadShopList();
    }, []);

    const loadShopList = async () => {
        setIsShopListLoading(true);
        try {
            const { data } = await axios.get(`/products?limit=4`);
            setShopList(data);
        } catch (err) {
            console.log(err);
        }
        setIsShopListLoading(false);
    };

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
                    shopList &&
                    shopList.map((item) => (
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
