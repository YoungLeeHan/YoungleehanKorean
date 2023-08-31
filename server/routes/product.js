import express from "express";
const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import { upload } from "../middlewares/filehelper.js";

//controllers
import {
    create,
    list,
    read,
    images,
    remove,
    update,
    filteredProducts,
    productsCount,
    listProducts,
    productsSearch,
    relatedProducts,
} from "../controllers/product.js";

router.post(
    "/product",
    requireSignin,
    isAdmin,
    upload.array("productImages", 5),
    create
);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/images/:productId", images);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put(
    "/product/:productId",
    requireSignin,
    isAdmin,
    upload.array("productImages", 5),
    update
);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);

export default router;
