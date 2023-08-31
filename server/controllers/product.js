import Product from "../models/product.js";
import pdfFile from "../models/pdfFile.js";
import fs from "fs";
import slugify from "slugify";
import { validateProduct } from "../helpers/validateProduct.js";

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

// Have to Remove!
export const images = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "images"
    );
    if (product.images.data) {
      res.set("Content-Type", product.images.contentType);
      return res.send(product.images.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-images");
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    const productData = validateProduct(req, res);
    const uploadedImagePath = filedata.map((data) => data.location);

    // update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(productData.title),
        imagePath: uploadedImagePath,
      },
      { new: true }
    );
    //
    // if (productData.images) {
    //     product.images.data = fs.readFileSync(productData.images.path);
    //     product.images.contentType = productData.images.type;
    // }
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
    const ylhPdfFile = new ylhPdfFile({
      name: uploadedPdfFile.originalname,
      location: uploadedPdfFile.location,
    });
    await ylhPdfFile.save();
    res.json(ylhPdfFile);
  } catch (err) {
    console.log(err);
  }
};
