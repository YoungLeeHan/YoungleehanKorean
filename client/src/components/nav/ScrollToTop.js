// 👻 Developed by DanBi Choi on July 24th, 2023.
// -----------------------------------------------------
import { useEffect } from "react";

export default function ScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
