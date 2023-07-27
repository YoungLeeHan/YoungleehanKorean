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
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute"
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminBlog from "./pages/Admin/Blog";
import AdminProduct from "./pages/Admin/Product";
import UserOrders from "./pages/User/Orders";
import UserProfile from "./pages/User/Profile";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Toaster />
            <Routes>
                {/*single page*/}
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />

                {/*login*/}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/newpassword" element={<NewPassword />} />

                {/*blog*/}
                <Route path="/blog" element={<List />} />
                <Route path="/blog/upload" element={<Upload />} />

                {/*user dashboard*/}
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="user" element={<Dashboard />} />
                    <Route path="user/profile" element={<UserProfile />} />
                    <Route path="user/orders" element={<UserOrders/>} />
                </Route>

                {/*admin dashboard*/}
                <Route path="/dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/blog" element={<AdminBlog />} />
                    <Route path="admin/product" element={<AdminProduct />} />
                </Route>


            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
