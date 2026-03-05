import { Skeleton } from "antd";
import "../ui/BlogCategory.css";

const ArticleCardSkeleton = () => (
  <div className="card">
    <div className="upper-part">
      <Skeleton.Image active style={{ width: "100%", height: 370 }} />
      <Skeleton active paragraph={{ rows: 2 }} style={{ padding: "15px" }} />
    </div>
  </div>
);

export const ArticleCardSkeletonList = ({ count = 6 }: { count?: number }) => (
  <section className="cards-section">
    {Array.from({ length: count }).map((_, i) => (
      <ArticleCardSkeleton key={i} />
    ))}
  </section>
);

export default ArticleCardSkeleton;
