import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//config
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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

// export const getToken = await gateway.clientToken
//   .generate({})
//   .then((err, response) => {
//     res.send(response);
//   });

export const processPayment = async (req, res) => {
  try {
    console.log(req.body);
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let newTransaction = gateway.transaction.sale(
      {
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
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

export const create = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.fields);
    // console.log(req.files);
    const {
      title,
      category,
      age,
      description,
      price,
      reviewRate,
      reviewNumber,
      numberSold,
      createAt,
    } = req.fields;
    const { images } = req.files;

    // validationc
    switch (true) {
      case !title.trim():
        return res.json({ error: "title is required" });
      case images && images.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !age.trim():
        return res.json({ error: "age is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !reviewRate.trim():
        return res.json({ error: "reviwRate is required" });
      case !reviewNumber.trim():
        return res.json({ error: "reviewNumber is required" });
      case !numberSold.trim():
        return res.json({ error: "numberSold is required" });
      case !createAt.trim():
        return res.json({ error: "createAt is required" });
    }

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

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
        slug: slugify(name),
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
