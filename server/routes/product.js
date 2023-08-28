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
} from "../controllers/product.js";
import {
    processMultiImages,
    processSingleImage,
    uploadMultiImages,
    uploadSingleImage,
    getImage,
    deleteProductImages,
} from "../controllers/productImage.js";

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


router.post("/product/single-image", uploadSingleImage, processSingleImage );
router.get("/product/productImages", getImage);
router.post("/product/multi-images", uploadMultiImages, processMultiImages );
router.delete("/product/deleteImages/:id", deleteProductImages );


export default router;
