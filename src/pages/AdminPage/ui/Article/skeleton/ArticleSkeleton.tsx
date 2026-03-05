import { Skeleton } from "antd";
import "../Article.css";

const ArticleSkeleton = () => {
    return (
        <div className="article-card">
            <div className="card-top-bar">
                <Skeleton.Button active size="small" style={{ width: 80, height: 24 }} />
                <Skeleton.Button active size="small" style={{ width: 100, height: 24 }} />
            </div>

            <div className="card-content-wrapper">
                <div className="card-visuals">
                    <div className="main-cover-wrapper">
                        <Skeleton.Image active style={{ width: '100%', height: 300 }} />
                        <div className="image-caption">
                            <Skeleton.Input active size="small" style={{ width: 80 }} />
                        </div>
                    </div>
                    <div className="mini-gallery">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton.Avatar key={i} active size="large" shape="square" style={{ width: 60, height: 60 }} />
                        ))}
                    </div>
                </div>

                <div className="card-info">
                    <div className="title-section">
                        <Skeleton active title={{ width: '70%' }} paragraph={false} />
                        <Skeleton.Input active size="small" style={{ width: 150 }} />
                    </div>

                    <div className="meta-data-grid">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="meta-item">
                                <Skeleton.Input active size="small" style={{ width: '90%' }} />
                            </div>
                        ))}
                    </div>

                    <div className="tags-section">
                        <div className="tags-list">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton.Button key={i} active size="small" style={{ width: 60, marginRight: 8 }} />
                            ))}
                        </div>
                    </div>

                    <div className="desc-section">
                        <Skeleton active paragraph={{ rows: 2 }} title={false} />
                    </div>

                    <div className="article-body-preview">
                        <Skeleton active paragraph={{ rows: 4 }} title={false} />
                    </div>
                </div>
            </div>

            <div className="feedback-section">
                <Skeleton.Input active style={{ width: '100%', height: 80 }} />
            </div>

            <div className="card-actions">
                <Skeleton.Button active style={{ width: '45%', height: 50 }} />
                <Skeleton.Button active style={{ width: '45%', height: 50 }} />
            </div>
        </div>
    );
};

export const ArticleSkeletonList = ({ count = 3 }: { count?: number }) => (
    <div className="articles-grid">
        {Array.from({ length: count }).map((_, i) => (
            <ArticleSkeleton key={i} />
        ))}
    </div>
);

export default ArticleSkeleton;
