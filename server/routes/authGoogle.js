import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login");
    console.log(`여기는 "/auth"입니다!`);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.redirect("http://localhost:8000");
    });
});

export default router;
