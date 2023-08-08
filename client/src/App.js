import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../src/components/nav/Header";
import Footer from "../src/components/nav/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PageNotFound from "./pages/PageNotFound";
import BlogView from "./pages/Blog/BlogView";
import SingleBlogView from "./pages/Blog/SingleBlogView";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verification from "./pages/Auth/Verification";
import NewPassword from "./pages/Auth/NewPassword";
import Contact from "./pages/Contact";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminBlog from "./pages/Admin/Post";
import AdminProduct from "./pages/Admin/Product";
import AdminProducts from "./pages/Admin/Products";
import AdminCategory from "./pages/Admin/Category";
import UserOrders from "./pages/User/Orders";
import UserProfile from "./pages/User/Profile";
import CategoriesList from "./pages/CategoriesList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Payment/Checkout";
import ProductsView from "./pages/Shop/ProductsView";
import SingleProductView from "./pages/Shop/SingleProductView";
import AdminProductUpdate from "./pages/Admin/ProductUpdate";
import AdminCreatePost from "./pages/Admin/Blog";
import AdminBlogCategory from "./pages/Admin/BlogCategory";
import AdminBlogPostList from "./pages/Admin/BlogList";
import AdminBlogUpdate from "./pages/Admin/BlogUpdate";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Toaster position="top-right" reverseOrder={false} />

            <Routes>
                {/*single page*/}
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/categories" element={<CategoriesList />} />

                {/*login*/}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                <Route path="/blog/:_id" element={<SingleBlogView />} />
                {/* <Route path="/blog/upload" element={<Upload />} /> */}

                {/*Cart & Payment*/}
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/checkout" element={<Checkout />} />

                {/*user dashboard*/}
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="user" element={<Dashboard />} />
                    <Route path="user/profile" element={<UserProfile />} />
                    <Route path="user/orders" element={<UserOrders />} />
                </Route>

                {/*admin dashboard*/}
                <Route path="/dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/blog" element={<AdminBlog />} />

                    <Route path="admin/category" element={<AdminCategory />} />
                    <Route path="admin/product" element={<AdminProduct />} />
                    <Route path="admin/products" element={<AdminProducts />} />
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
