//multer-s3 버전

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2",
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: multerS3({
        s3,
        bucket: "ylhprototype",
        key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}__${file.originalname}`);
        },
    }),
    fileFilter: filefilter,
});

export { upload };
