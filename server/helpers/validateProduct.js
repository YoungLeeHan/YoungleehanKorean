export const validateProduct = (req, res, next) => {
    try {
        const { title, category, ageCategory, description, price } = req.fields;
        const { images } = req.files;

        switch (true) {
            case !title.trim():
                return res.json({ error: "Title is required" });
            case !description.trim():
                return res.json({ error: "Description is required" });
            case !price.trim():
                return res.json({ error: "Price is required" });
            case !category.trim():
                return res.json({ error: "Category is required" });
            case !ageCategory.trim():
                return res.json({ error: "Age Category is required" });
            case images && images.size > 1000000:
                return res.json({
                    error: "Image should be less than 1MB in size",
                });
            default:
                null;
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};
