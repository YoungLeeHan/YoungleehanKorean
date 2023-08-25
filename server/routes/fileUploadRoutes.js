import express from "express";
const router = express.Router();
import { upload } from "../helpers/filehelper.js";
import {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallMultipleFiles,
} from "../controllers/fileuploader.js";

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);

export default {
    routes: router,
};
