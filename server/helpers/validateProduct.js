export const validateProduct = (req, res) => {
  const { title, category, ageCategory, description, price, ylhPdfFile } =
    req.body;

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
    case !ylhPdfFile.trim():
      return res.json({ error: "a PDF file is required" });
    default:
      return {
        title,
        description,
        price,
        category,
        ageCategory,
        ylhPdfFile,
      };
  }
};
