// 👻 Developed by DanBi Choi on Aug 30th, 2023.
// -----------------------------------------------------
import { useState, useEffect } from "react";
import axios from "axios";

export default function useAgeCategory() {
    const [ageCategories, setAgeCategories] = useState([]);

    useEffect(() => {
        loadAgeCategories();
    }, []);

    const loadAgeCategories = async () => {
        try {
            const { data } = await axios.get("/ageCategories");
            setAgeCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    return { ageCategories, loadAgeCategories };
}
