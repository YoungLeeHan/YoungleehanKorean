import "../../styles/components/nav/Footer.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Badge } from "antd";
import { useCartQuantity } from "../../context/cartQuantity";
import React, { useState } from "react";

export default function Footer({ className, footerClassName }) {
const [email, setEmail] = useState("");

const handleEmailChange = (e) => {
setEmail(e.target.value);
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Subscribed with email:", email);
};

return (
<div className="footer">
<div className="content-wrapper">
<div className="main-content">
<div className="youngleehan-korean">YoungLeeHan Korean</div>
<div className="links">
<div className="LINKS-2">LINKS</div>
<p className="home-about">
<li className="nav-item">
<NavLink className="nav-link" aria-current="page" to="/">
HOME
</NavLink>
</li>
<li className="nav-item">
<NavLink className="nav-link" to="/about">
About
</NavLink>
</li>
<li className="nav-item">
<NavLink className="nav-link" to="/worksheets">
Worksheets
</NavLink>
</li>
<li className="nav-item">
<NavLink className="nav-link" to="/shop">
Shop
</NavLink>
</li>
<li className="nav-item">
<NavLink className="nav-link" to="/contact">
Contact
</NavLink>
</li>
</p>
</div>
{/* <div className="newletter">
<div className="NEWSLETTER-2">NEWSLETTER</div>
<p className="let-s-learn-with">
Let’s learn with YoungLeeHan Korean
</p>
<div className="SUBSCRIBE">
<div className="button-bg" />
<div className="subscribe-form">
<div className="enter-your-email">
<input
type="email"
value={email}
onChange={handleEmailChange}
placeholder="Enter your email"
/>
</div>
<div className="SUBSCRIBE-2">
<button onClick={handleSubmit}>SUBSCRIBE</button>
</div>
</div>
</div>
</div> */}
</div>
<div className="sub-content">hello</div>
{/* <div className="element-all-rights">
<img className="line" alt="Line" src="line-6.svg" />
<div className="copyright-deski">
<div className="div">
<div className="privacy-terms">Privacy &amp; Terms</div>
<p className="text-wrapper">
© 2023. All rights reserved by YoungLeeHan Korean
</p>
</div>
</div>
</div> */}
</div>
</div>
);
}