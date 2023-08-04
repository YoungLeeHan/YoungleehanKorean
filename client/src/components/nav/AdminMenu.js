import { NavLink } from "react-router-dom";

export default function AdminMenu() {
    return (
        <>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Links</div>
            <ul className="list-group list-unstyled">
                <div className="p-1 pt-2"><h3>- Product Management</h3></div>
                <li>
                    <NavLink
                        className="list-group-item"
                        to="/dashboard/admin/category"
                    >
                        Product Category
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className="list-group-item"
                        to="/dashboard/admin/product"
                    >
                        Create a new product
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="list-group-item"
                        to="/dashboard/admin/products"
                    >
                        View products
                    </NavLink>
                </li>

                <div className="p-1 pt-4"><h3>- Blog Management</h3></div>
                <li>
                    <NavLink
                        className="list-group-item"
                        to="/dashboard/admin/blog/category"
                    >
                        Blog Category
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className="list-group-item"
                        to="/dashboard/admin/blog/createpost"
                    >
                        Create a blog post
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="list-group-item"
                        to="/dashboard/admin/blog/list"
                    >
                        View blog posts
                    </NavLink>
                </li>
            </ul>
        </>
    );
}
