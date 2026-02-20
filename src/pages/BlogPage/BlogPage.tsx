import "./BlogPage.css";
import BlogSidebar from "../../components/BlogPage/ui/BlogSidebar/BlogSidebar";
import FooterHome from "../HomePage/ui/Footer/FooterHome";
import Header from "@/components/Header/Header";
import { Route, Routes } from "react-router-dom";
import BlogList from "./BlogList/BlogList";
import BlogCategory from "./BlogCategory/BlogCategory";

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      <Header />

      <div className="blog-content-wrapper">
        <div className="blog-layout-row">
          <BlogSidebar />

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/category/:categoryName" element={<BlogCategory />} />
          </Routes>
        </div>
      </div>

      <FooterHome />
    </div>
  );
};

export default BlogPage;
