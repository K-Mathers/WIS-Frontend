import { useParams, useNavigate } from "react-router-dom";
import "./BlogCategory.css";
import { getPublicBlog } from "@/api/blog";
import type { IData } from "@/components/BlogPage/type/type";
import { useQuery } from "@tanstack/react-query";

const BlogCategory = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();

  const { data: filteredBlogs, isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: getPublicBlog,
    select: (blogs) => {
      if (!blogs?.data) return [];
      if (!categoryName) return blogs.data;
      return blogs.data.filter((el: IData) => el.category === categoryName);
    },
  });

  const blogs = filteredBlogs || [];
    
  if (isLoading) {
    return (
      <div className="blog-category-container">
        <div className="comic-loader">LOADING ARTICLES... ZZZAP!</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="blog-category-container">
        <div className="comic-empty-card">
          <h2>WHOOPS!</h2>
          <p>STAY TUNED FOR MORE AWESOME CONTENT!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-category-container">
      <h1 className="category-header">
        <span className="category-subheader">{blogs.length} ARTICLES!</span>
      </h1>
      <section className="cards-section">
        {blogs.map((el: IData) => {
          return (
            <div
              onClick={() => navigate(`/blog/${el.id}`)}
              className="card"
              key={el.id}
            >
              <div className="upper-part">
                <img src={el.coverImage} className="soon-image" alt="cover" />
                <p className="card-description">{el.title}</p>
                <p className="card-short-description">{el.shortDescription}</p>
                <p>
                  {new Date(el.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default BlogCategory;
