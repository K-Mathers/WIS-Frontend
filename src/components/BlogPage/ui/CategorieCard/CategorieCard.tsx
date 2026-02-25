import { useMemo } from "react";
import "./CategorieCard.css";
import { getPublicBlog } from "@/api/blog";
import type { IBlogMapping } from "../../type/type";
import { CATEGORY_KEYS } from "@/const/blogCategory";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CategorieCard = () => {
  const navigate = useNavigate();

  const { data: blogsList, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getPublicBlog,
    staleTime: 1000 * 60 * 5,
  });

  const latestByCategory = useMemo(() => {
    if (!blogsList?.data) return {};

    const mapping: IBlogMapping = {};

    const sorted = [...blogsList.data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    CATEGORY_KEYS.forEach(({ key }) => {
      mapping[key] = sorted.find((blog) => blog.category === key);
    });
    return mapping;
  }, [blogsList]);

  if (isLoading) return <div className="comic-loader">LOADING ARTICLES...</div>;

  return (
    <section className="cards-section">
      {CATEGORY_KEYS.map(({ key, label }) => {
        const article = latestByCategory[key];
        return (
          <div
            onClick={() => navigate(`/blog/${article?.id}`)}
            className="card"
            key={key}
          >
            <div className="upper-part">
              <p className="card-title">{label}</p>

              {article ? (
                <>
                  <img
                    src={article.coverImage}
                    className="soon-image"
                    alt="cover"
                  />
                  <p className="card-description">{article.title}</p>
                  <p className="card-short-description">
                    {article.shortDescription}
                  </p>
                  <p>
                    {new Date(article.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              ) : (
                <div className="empty-category">
                  <p className="card-description">COMING SOON...</p>
                  <p className="card-short-description">
                    Stay tuned for updates!
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CategorieCard;
