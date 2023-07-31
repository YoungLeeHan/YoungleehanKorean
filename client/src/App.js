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
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verification from "./pages/Auth/Verification";
import NewPassword from "./pages/Auth/NewPassword";
import Contact from "./pages/Contact";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminBlog from "./pages/Admin/Blog";
import AdminProduct from "./pages/Admin/Product";
// import AdminProducts from "./pages/admin/Products";
import AdminCategory from "./pages/Admin/Category";
import UserOrders from "./pages/User/Orders";
import UserProfile from "./pages/User/Profile";
import Cart from "./pages/Cart";
import ProductsView from "./pages/Shop/ProductsView";
import AdminProductUpdate from "./pages/Admin/ProductUpdate";
import CategoriesList from "./pages/CategoriesList";
import Search from "./pages/Search";

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
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/search" element={<Search />} />

        {/*login*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />

        {/*shop*/}
        <Route path="/shop" element={<ProductsView />} />
        <Route path="/shop/:slug" />

        {/*blog*/}
        <Route path="/blog" element={<BlogView />} />
        <Route path="/blog/:_id" />
        {/* <Route path="/blog/upload" element={<Upload />} /> */}

        {/*Cart & Payment*/}
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/payment" />

        {/*user dashboard*/}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />

        </Route>

        {/*admin dashboard*/}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/post" element={<AdminBlog />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          {/* <Route path="admin/products" element={<AdminProducts />} /> */}
          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
