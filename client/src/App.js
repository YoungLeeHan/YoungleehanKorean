import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/nav/Header";
import Footer from "../src/components/nav/Footer";
import Home from "./pages/Home";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import PageNotFound from "./pages/PageNotFound";
import List from "./pages/Blog/List";
import Upload from "./pages/Blog/Upload";
import ForgotPassword from "./pages/Account/ForgotPassword";
import Verification from "./pages/Account/Verification";
import NewPassword from "./pages/Account/NewPassword";
import Contact from "./pages/Contact";

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
                <Route path="/blog" element={<List />} />
                <Route path="/blog/upload" element={<Upload />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
