import Product from "../models/product.js";
import ylhPdfFile from "../models/ylhPdfFile.js";
import slugify from "slugify";
import { validateProduct } from "../helpers/validateProduct.js";
import AWS from 'aws-sdk';


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


export const create = async (req, res) => {
  try {
    const productData = validateProduct(req, res);
    const filedata = req.files;

    const uploadedImagePath = filedata.map((data) => data.location);


    // create product
    const product = new Product({
      ...req.body,
      slug: slugify(productData.title),
      imagePath: uploadedImagePath,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    let limit = 12;
    if (req.query) limit = req.query.limit;
    const products = await Product.find({})
      .populate("category")
      .select("-images")
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-images")
      .populate("category")
      .populate("ageCategory");
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};


export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    // Check if product has images
    if (!product.imagePath || product.imagePath.length === 0) {
      return res.status(404).json({ error: 'Product not found or does not have images' });
    }

    // Remove images from S3
    const imagesToDelete = product.imagePath;
    for (const imageUrl of imagesToDelete) {
      const fileName = imageUrl.split('/').pop(); // Extract the file name from the URL
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `productImages/${fileName}`, // Adjust the S3 path as needed
      };

      // Delete the file from S3
      await s3.deleteObject(params).promise();
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product and associated images' });
  }
};



export const update = async (req, res) => {
  try {
    const productData = validateProduct(req, res);
    const filedata = req.files;

    const uploadedImagePath = filedata.map((data) => data.location);

    // update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.body,
        slug: slugify(productData.title),
        imagePath: uploadedImagePath,
      },
      { new: true }
    );

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { level, age, priceRange } = req.body;

    const args = {};
    if (level && level.length > 0) args.category = level;

    if (age && age.length > 0) args.ageCategory = age;

    if (priceRange && priceRange.length) {
      args.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }
    const products = await Product.find(args)
      .select("-images")
      .populate("category")
      .populate("ageCategory")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-images")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .select("-images")
      .populate("category")
      .populate("ageCategory")
      .limit(4)
      .sort({ createdAt: -1 });

    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .select("-images")
      .populate("category")
      .populate("ageCategory")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const savePdf = async (req, res) => {
  try {
    const uploadedPdfFile = req.file;
    const generatedFile = new ylhPdfFile({
      name: uploadedPdfFile.key,
      location: uploadedPdfFile.location,
    });
    await generatedFile.save();
    res.json(generatedFile);
  } catch (err) {
    console.log(err);
  }
};
