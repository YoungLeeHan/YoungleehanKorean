// 👻 Developed by DanBi Choi on Aug 30th, 2023.
// -----------------------------------------------------
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function useBlogList(endpoint, cbOnSuccess) {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        loadBlogList();
    }, []);

    const loadBlogList = async () => {
        try {
            const { data } = await axios.get(endpoint);
            if (data.error) {
                toast.error(data.error);
            } else {
                setBlogList(data);
                if (cbOnSuccess && typeof cbOnSuccess === "function")
                    cbOnSuccess();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return blogList;
}
