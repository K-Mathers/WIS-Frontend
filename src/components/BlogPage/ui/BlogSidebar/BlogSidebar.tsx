import { NavLink } from "react-router-dom";
import "./BlogSidebar.css";
import { motion } from "framer-motion";
import { shake } from "@/utils/animations";

const categories = [
  "PREMIUM_COLLECTION",
  "BEST_MINIMALS",
  "CRAZY_SHOES",
  "MY_BLOG",
  "USERS_ARTICLES",
];

const BlogSidebar = () => {
  return (
    <motion.aside className="blog-sidebar" variants={shake} initial="hidden" animate="visible">
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
              to={`/blog/category/${category}`}
              className={({ isActive }) =>
                isActive ? "category-item active" : "category-item"
              }
            >
              {category.split("_").join(" ")}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

export default BlogSidebar;
