import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/nav/Header";
import Footer from "../src/components/nav/Footer";
import Home from "./pages/Home";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import PageNotFound from "./pages/PageNotFound";
import BlogList from "./pages/BlogList";
import ForgotPassword from "./pages/Account/ForgotPassword";
import Verification from "./pages/Account/Verification";
import NewPassword from "./pages/Account/NewPassword";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/newpassword" element={<NewPassword />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
