// 👻 Developed by DanBi Choi on Aug 30th, 2023.
// -----------------------------------------------------
import { useState, useEffect } from "react";
import axios from "axios";

export default function useLevelCategory() {
    const [levelCategories, setLevelCategories] = useState([]);

    useEffect(() => {
        loadLevelCategories();
    }, []);

    const loadLevelCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setLevelCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    return { levelCategories, loadLevelCategories };
}
