import BlogPost from "../models/BlogPost.js";
import slugify from "slugify";
import fs from "fs";
import Product from "../models/product.js";

export const create = async (req, res) => {
    try {
        const { title, category, value } = req.fields;
        const { images } = req.files;

        // validation
        switch (true) {
            case !title.trim():
                return res.json({ error: "title is required" });
            case !category.trim():
                return res.json({ error: "Category is required" });
            case !value.trim():
                return res.json({ error: "Content is required" });
            case images && images.size > 10000000:
                return res.json({
                    error: "Image should be less than 1mb in size",
                });
        }
//         // create post
//         const post = await new BlogPost({ ...req.fields }).save();
//         res.json(post);
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json(err.message);
//     }
// };
        const post =  await new BlogPost({ ...req.fields })

        if (images) {
            post.images.data = fs.readFileSync(images.path);
            post.images.contentType = images.type;
        }

        await post.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const images = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.postId).select(
            "images"
        );
        if (post.images.data) {
            res.set("Content-Type", post.images.contentType);
            return res.send(post.images.data);
        }
    } catch (err) {
        console.log(err);
    }
};



export const list = async (req, res) => {
    try {
        const posts = await BlogPost.find({})
            .populate("category")
            .limit(12)
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.log(err);
    }
};
