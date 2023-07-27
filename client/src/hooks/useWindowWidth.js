import { useState, useEffect } from "react";

export default function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
        window.addEventListener("reset", () => {
            setWindowWidth(window.innerWidth);
        });
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
        return () => {
            window.removeEventListener(
                "resize",
                setWindowWidth(window.innerWidth)
            );
        };
    }, []);

    return windowWidth;
}
