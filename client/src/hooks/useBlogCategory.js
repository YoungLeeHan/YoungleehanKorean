import { useState, useEffect } from "react";
import axios from "axios";

export default function useBlogCategory() {
    const [blogCategories, setBlogCategories] = useState([]);

    useEffect(() => {
        loadBlogCategories();
    }, []);

    const loadBlogCategories = async () => {
        try {
            const { data } = await axios.get("/blog/category/list");
            setBlogCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    return { blogCategories, loadBlogCategories };
}
