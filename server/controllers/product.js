import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// braintree config
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const create = async (req, res) => {
  try {
    const { title, category, ageCategory, description, price } = req.fields;
    const { images } = req.files;
    console.log("ageCategory=>", ageCategory);
    console.log("req.fields=>", req.fields);
    // validation
    switch (true) {
      case !title.trim():
        return res.json({ error: "title is required" });
      case images && images.size > 1000000:
        return res.json({
          error: "Image should be less than 1mb in size",
        });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !ageCategory.trim():
        return res.json({ error: "age is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
    }
    // create product
    const product = new Product({ ...req.fields, slug: slugify(title) });

    if (images) {
      product.images.data = fs.readFileSync(images.path);
      product.images.contentType = images.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-images")
      .limit(12)
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
      .populate("category");

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

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
    // console.log(req.fields);
    // console.log(req.files);
    const { title, description, price, category, age, createAt } = req.fields;
    const { images } = req.files;

    // validation
    switch (true) {
      case !title.trim():
        res.json({ error: "Title is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !age.trim():
        res.json({ error: "age is required" });
      // case !createAt.trim():
      //   res.json({ error: "createAt is required" });
      case images && images.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }

    // update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(title),
      },
      { new: true }
    );

    if (images) {
      product.images.data = fs.readFileSync(images.path);
      product.images.contentType = images.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { level, ageCategory: age, priceRange, reviewRate } = req.body;

    const args = {};
    if (level && level.length > 0) args.category = level;

    if (age && age.length > 0) args.category = age;

    if (priceRange && priceRange.length) {
      args.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    if (reviewRate && reviewRate.length > 0) {
      args.reviewRate = reviewRate[0];
    }

    console.log("body=> ", req.body);

    const products = await Product.find(args);
    console.log("filtered products query => ", products);
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
      .select("-photo")
      .populate("category")
      .limit(3);

    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    await gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response); // token to show the drop-in UI
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { nonce, cart } = req.body;
    console.log(cart);

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    console.log("total", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true, //immediate settlement
        },
      },
      function (error, result) {
        if (result) {
          res.send(result);
        } else {
          res.status(500).send(error);
        }
      }
    );
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
    }).select("-images");
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};
