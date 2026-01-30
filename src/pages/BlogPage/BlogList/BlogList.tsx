import CategorieCard from "@/components/BlogPage/ui/CategorieCard/CategorieCard";
import "./BlogList.css";
import CreateArticle from "@/components/BlogPage/ui/CreateArticle/CreateArticle";

const BlogList = () => {
  return (
    <div className="blog-content-column">
      <CategorieCard />
      <CreateArticle />
    </div>
  );
};

export default BlogList;
