import express from "express";
const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import { upload, uploadPDF, downloadPdf } from "../middlewares/filehelper.js";

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
  savePdf,
} from "../controllers/product.js";

router.post(
  "/uploadPdf",
  requireSignin,
  isAdmin,
  uploadPDF("downloads").single("pdfFile"),
  savePdf
);

router.post(
  "/product",
  requireSignin,
  isAdmin,
  upload("productImages").array("productImages", { multiple: true }),
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
  upload("productImages").array("productImages", 5),
  update
);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);
router.get("/download/:fileId", downloadPdf);

export default router;
