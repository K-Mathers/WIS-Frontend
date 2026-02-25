import { useParams, useNavigate } from "react-router-dom";
import "./BlogCategory.css";
import { getPublicBlog } from "@/api/blog";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const BlogCategory = () => {
  const { data: blogsList, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getPublicBlog,
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();

  const { categoryName } = useParams<{ categoryName?: string }>();

  const filteredBlog = useMemo(() => {
    if (!blogsList?.data) return [];

    if (!categoryName) {
      return blogsList.data;
    }

    return blogsList.data.filter((el) => el.category === categoryName);
  }, [blogsList?.data, categoryName]);

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
