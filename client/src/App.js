import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/nav/Header";
import Footer from "../src/components/nav/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EmailVerification from "./pages/Auth/EmailVerification";
import PageNotFound from "./pages/PageNotFound";
import BlogView from "./pages/Blog/BlogView";
import SingleBlogView from "./pages/Blog/SingleBlogView";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verification from "./pages/Auth/Verification";
import NewPassword from "./pages/Auth/NewPassword";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminProductCreate from "./pages/Admin/ProductCreate";
import AdminProductList from "./pages/Admin/ProductList";
import AdminProductCategory from "./pages/Admin/ProductCategory";
import AdminProductAgeCategory from "./pages/Admin/ProductAgeCategory";
import MyOrders from "./pages/User/MyOrders";
import UserProfile from "./pages/User/UserProfile";
import ChangePassword from "./pages/User/ChangePassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Payment/Checkout";
import ProductsView from "./pages/Shop/ProductsView";
import SingleProductView from "./pages/Shop/SingleProductView";
import AdminProductUpdate from "./pages/Admin/ProductUpdate";
import AdminCreatePost from "./pages/Admin/BlogCreate";
import AdminBlogCategory from "./pages/Admin/BlogCategory";
import AdminBlogPostList from "./pages/Admin/BlogList";
import AdminBlogUpdate from "./pages/Admin/BlogUpdate";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFail from "./pages/Payment/PaymentFail";
import Creator from "./pages/Creator";
import Ourstory from "./pages/Ourstory";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Toaster position="top-right" reverseOrder={false} />

            <Routes>
                {/*single page*/}
                <Route path="/" element={<Home />} />
                <Route path="/creator" element={<Creator />} />
                <Route path="/ourstory" element={<Ourstory />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />

                {/*login*/}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/:id/verify/:token"
                    element={<EmailVerification />}
                />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/newpassword" element={<NewPassword />} />

                {/*shop*/}
                <Route path="/shop" element={<ProductsView />} />
                <Route
                    path="/shop/product/:slug"
                    element={<SingleProductView />}
                />

                {/*blog*/}
                <Route path="/blog" element={<BlogView />} />
                <Route path="/blog/:slug" element={<SingleBlogView />} />

                {/*Cart & Payment*/}
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/checkout" element={<Checkout />} />
                <Route
                    path="/cart/checkout/success/:orderNumber"
                    element={<PaymentSuccess />}
                />
                <Route path="/cart/checkout/fail" element={<PaymentFail />} />

                {/*user dashboard*/}
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="user/profile" element={<UserProfile />} />
                    <Route
                        path="user/profile/password"
                        element={<ChangePassword />}
                    />
                    <Route path="user/orders" element={<MyOrders />} />
                </Route>

                {/*admin dashboard*/}
                <Route path="/dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route
                        path="admin/category"
                        element={<AdminProductCategory />}
                    />
                    <Route
                        path="admin/ageCategory"
                        element={<AdminProductAgeCategory />}
                    />
                    <Route
                        path="admin/product"
                        element={<AdminProductCreate />}
                    />
                    <Route
                        path="admin/products"
                        element={<AdminProductList />}
                    />
                    <Route
                        path="admin/product/update/:slug"
                        element={<AdminProductUpdate />}
                    />
                    <Route
                        path="admin/blog/category"
                        element={<AdminBlogCategory />}
                    />
                    <Route
                        path="admin/blog/createpost"
                        element={<AdminCreatePost />}
                    />
                    <Route
                        path="admin/blog/list"
                        element={<AdminBlogPostList />}
                    />
                    <Route
                        path="admin/blog/update/:slug"
                        element={<AdminBlogUpdate />}
                    />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
