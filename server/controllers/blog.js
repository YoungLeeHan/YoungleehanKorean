import BlogPost from "../models/BlogPost.js";
import slugify from "slugify";
import fs from "fs";
import sanitizeHtml from "sanitize-html";

const removeHtmlandShorten = (body) => {
    const filtered = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

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
        const post = await new BlogPost({
            ...req.fields,
            slug: slugify(title),
        });

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
        let limit = 12;
        if (req.query) {
            limit = req.query.limit;
        }

        const posts = await BlogPost.find({})
            .populate("category")
            .select("-images")
            .limit(limit)
            .sort({ createdAt: -1 });

        // Convert the 'value' field to HTML tag excluded and shortened form
        const sanitizedPosts = posts.map((post) => {
            return {
                ...post._doc,
                value: removeHtmlandShorten(post.value),
            };
        });

        res.json(sanitizedPosts);
    } catch (err) {
        console.log(err);
    }
};

export const read = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug })
            .select("-images")
            .populate("category");

        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

export const update = async (req, res) => {
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

        // update product
        const post = await BlogPost.findByIdAndUpdate(
            req.params.postId,
            {
                ...req.fields,
                slug: slugify(title),
            },
            { new: true }
        );

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

export const remove = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.postId).select(
            "-images"
        );
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

// filteredPost
export const filteredPost = async (req, res) => {
    try {
        const { categoryFilter } = req.body;

        const args = {};
        if (categoryFilter && categoryFilter.length > 0)
            args.category = categoryFilter;

        const posts = await BlogPost.find(args)
            .select("-images")
            .populate("category")
            .sort({ createdAt: -1 });

        // Convert the 'value' field to HTML tag excluded and shortened form
        const sanitizedPosts = posts.map((post) => {
            return {
                ...post._doc,
                value: removeHtmlandShorten(post.value),
            };
        });

        res.json(sanitizedPosts);
    } catch (err) {
        console.log(err);
    }
};

// postSearch
export const postSearch = async (req, res) => {
    try {
        const { keyword } = req.params;
        const posts = await BlogPost.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { value: { $regex: keyword, $options: "i" } },
            ],
        })
            .select("-images")
            .populate("category")
            .sort({ createdAt: -1 });

        // Convert the 'value' field to HTML tag excluded and shortened form
        const sanitizedPosts = posts.map((post) => {
            return {
                ...post._doc,
                value: removeHtmlandShorten(post.value),
            };
        });

        res.json(sanitizedPosts);
    } catch (err) {
        console.log(err);
    }
};

// listPosts
export const listPosts = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;

        const posts = await BlogPost.find({})
            .select("-images")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        // Convert the 'value' field to HTML tag excluded and shortened form
        const sanitizedPosts = posts.map((post) => {
            return {
                ...post._doc,
                value: removeHtmlandShorten(post.value),
            };
        });

        res.json(sanitizedPosts);
    } catch (err) {
        console.log(err);
    }
};
