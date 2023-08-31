//multer-s3 버전

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb("Error: Image files (.png, .jpg, .jpeg only.");
  }
};

const upload = (folder) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      contentType(req, file, done) {
        done(null, file.mimetype);
      },
      key: (req, file, cb) => {
        const timestamp = Date.now().toString();
        const originalname = file.originalname;
        const fullPath = `${folder}/${timestamp}__${originalname}`;
        cb(null, fullPath);
      },
    }),
    fileFilter: filefilter,
  });

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadPDF = (folder) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      contentType(req, file, done) {
        done(null, file.mimetype);
      },
      key: (req, file, cb) => {
        const timestamp = Date.now().toString();
        const originalname = file.originalname;
        const fullPath = `${folder}/${timestamp}__${originalname}`;
        cb(null, fullPath);
      },
    }),
    fileFilter: pdfFilter,
  });

export { upload, uploadPDF };
