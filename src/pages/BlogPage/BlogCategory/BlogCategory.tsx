import { useParams, useNavigate } from "react-router-dom";
import "./BlogCategory.css";
import { getPublicBlog } from "@/api/blog";
import { useEffect, useMemo, useState } from "react";
import type { IBlog } from "@/components/BlogPage/type/type";

const BlogCategory = () => {
  const [blogsList, setBlogsList] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { categoryName } = useParams<{ categoryName?: string }>();

  const filteredBlog = useMemo(() => {
    if (!blogsList?.data) return [];

    if (!categoryName) {
      return blogsList.data;
    }

    return blogsList.data.filter((el) => el.category === categoryName);
  }, [blogsList?.data, categoryName]);
  console.log(blogsList);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await getPublicBlog();
      console.log(response);
      setBlogsList(response);
    } catch (err) {
      console.error("Ошибка при загрузке блога:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="blog-category-container">
        <div className="comic-loader">LOADING ARTICLES... ZZZAP!</div>
      </div>
    );
  }

  if (filteredBlog.length === 0) {
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
        <span className="category-subheader">
          {filteredBlog.length} ARTICLES!
        </span>
      </h1>
      <section className="cards-section">
        {filteredBlog.map((el) => {
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
