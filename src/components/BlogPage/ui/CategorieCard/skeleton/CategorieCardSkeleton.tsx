import { Skeleton } from "antd";

const CategorieCardSkeleton = () => (
  <div className="card">
    <div className="upper-part">
      <Skeleton.Input
        active
        style={{ width: "100%", height: 60, display: "block" }}
      />
      <Skeleton.Image
        active
        style={{ width: "100%", height: 370 }}
      />
      <div style={{ padding: "15px" }}>
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      </div>
    </div>
  </div>
);

export const CategorieCardSkeletonList = ({ count = 6 }: { count?: number }) => (
  <section className="cards-section">
    {Array.from({ length: count }).map((_, i) => (
      <CategorieCardSkeleton key={i} />
    ))}
  </section>
);

export default CategorieCardSkeleton;
