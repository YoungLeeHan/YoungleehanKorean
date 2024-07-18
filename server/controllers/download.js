import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config();

const createPresignedUrlWithClient = ({ region, bucket, key }) => {
  const client = new S3Client({ region }); // generate a new S3 client
  const command = new GetObjectCommand({ Bucket: bucket, Key: key }); // generate a command to get an object
  return getSignedUrl(client, command, { expiresIn: 3600 }); // generate a presigned URL that is valid for an hour
};

export const downloadFromS3 = async (req, res) => {
  const REGION = process.env.AWS_REGION;
  const BUCKET = process.env.AWS_S3_BUCKET_NAME;
  const getKey = async () => {
    const product = await Product.findById(req.params.productId).populate(
      "ylhPdfFile"
    );
    const objectKey = product.ylhPdfFile.name;
    return objectKey;
  };
  const KEY = await getKey();

  try {
    const clientUrl = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });
    res.send(clientUrl);
  } catch (err) {
    console.error(err);
  }
};
