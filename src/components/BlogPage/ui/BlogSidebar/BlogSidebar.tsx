import { NavLink } from "react-router-dom";
import "./BlogSidebar.css";

const categories = [
  "PREMIUM_COLLECTION",
  "BEST_MINIMALS",
  "CRAZY_SHOES",
  "MY_BLOG",
  "USERS_ARTICLES",
];

const BlogSidebar = () => {
  return (
    <aside className="blog-sidebar">
      <div className="sidebar-sticky-content">
        <h2 className="sidebar-title">Categories</h2>
        <nav className="categories-list">
          <NavLink
            to="/blog"
            end
            className={({ isActive }) =>
              isActive ? "category-item active" : "category-item"
            }
          >
            ALL ARTICLES
          </NavLink>
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/blog/${category}`}
              className={({ isActive }) =>
                isActive ? "category-item active" : "category-item"
              }
            >
              {category.split("_").join(" ")}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default BlogSidebar;
