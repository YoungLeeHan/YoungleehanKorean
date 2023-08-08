import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

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
    getToken,
    processPayment,
} from "../controllers/product.js";

// admin product
// router.post(
//     "/product",
//     requireSignin,
//     isAdmin,
//     formidable(),
//     create,
//     (req, res) => {
//         res.json({ ok: true, age: ["kids"] });
//     }
// );
router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/images/:productId", images);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);

router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);

export default router;
